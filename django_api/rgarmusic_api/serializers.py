from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rgarmusic_api.models import *



User = get_user_model()

class CustomUserCreateSerializer(UserCreateSerializer):
    image = serializers.FileField(required=False)
    is_staff = serializers.BooleanField(default=False)
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('email', 'username', 'password', 'image', 'is_staff')

class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = ['id','email', 'image', 'MyplayList', 'username']



class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'picture', 'genre']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class TrackFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackFile
        # fields = "__all__"
        fields = ["test"]


class TrackSerializer(serializers.ModelSerializer):
    file = TrackFileSerializer(many=False, required=True)

    class Meta:
        model = Track
        fields = ['id','name', 'duration', 'artist', 'file']

    def create(self, validated_data):
        file_data = validated_data.pop('file')
        artist_data = validated_data.pop('artist')
        tags = validated_data.pop('tags')

        track_file = TrackFile.objects.create(**file_data)
        track = Track.objects.create(file=track_file, **validated_data)
        track.artist.set(artist_data)

        return track
class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), many=True)
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ['id','name', 'genre', 'artist', 'tracks', 'tags']

        # fields = ['name', 'genre', 'artist', 'tracks']

    def create(self, validated_data):
        artists = validated_data.pop('artist')
        tags = validated_data.pop('tags')
        tracks_data = validated_data.pop('tracks')

        album = Album.objects.create(**validated_data)
        album.artist.set(artists)
        album.tags.set(tags)

        for track_data in tracks_data:
            file_data = track_data.pop('file')
            artists = track_data.pop('artist')

            track_file = TrackFile.objects.create(**file_data)
            track = Track.objects.create(album=album, file=track_file, **track_data)
            track.artist.set(artists)
            track.save()

            album.tracks.add(track)
        return album

class TrackGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id','name', 'duration', 'artist']

class AlbumGetSerializer(serializers.ModelSerializer):
    tracks = TrackGetSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    artist = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = '__all__'


class ArtistDataSerializer(serializers.ModelSerializer):
    album_list = AlbumGetSerializer(many=True)

    class Meta:
        model = Artist
        fields = ['name', 'genre', 'album_list', 'track_list']

    track_list = serializers.SerializerMethodField()

    def get_track_list(self, obj):
        albums = obj.album_list.all()
        tracks = Track.objects.filter(album__in=albums)
        track_serializer = TrackGetSerializer(tracks, many=True)
        return track_serializer.data


class playListSerializer(serializers.ModelSerializer) :
    cover = serializers.FileField(required=False)
    track = TrackGetSerializer(many=True, required=False)
    user = UserDataSerializer(required=False)


    class Meta:
        model = MyPlaylist
        fields = "__all__"

    def update(self, instance, validated_data):
        # Get the list of track IDs from the request data
        track_id = self.context['request'].data.get('track_id', [])
        playList_id = self.context['request'].data.get('playList_id', [])

        # Add the tracks to the playlist
        tracks = Track.objects.filter(id__in=track_id)
        playList = MyPlaylist.objects.filer(id__in=playList_id)
        playList.track.add(*tracks)
        playList.save()

        return instance

class playListGetSerializer(serializers.ModelSerializer) :
    cover = serializers.FileField(required=False)
    # track = TrackGetSerializer(many=True, required=False)
    # user = UserDataSerializer(required=False)


    class Meta:
        model = MyPlaylist
        fields = ['id','name', 'cover']

class likedPlayListSerializer(serializers.ModelSerializer):
    playlist = playListGetSerializer(many=True)

    class Meta:
        model = LikedPlayList
        exclude = ('user', 'id')

class likeAlbumSerializer(serializers.ModelSerializer):
    album = AlbumGetSerializer(many=True)

    class Meta:
        model = LikeUserAlbum
        exclude = ('id', )

class likeArtistSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(many=True)

    class Meta:
        model = LikeUserArtist
        exclude = ('id', )

class UserDataSerializer(serializers.ModelSerializer):
    MyplayList = playListGetSerializer(many=True)
    LikedPlayLists = likedPlayListSerializer(many=False, read_only=True)
    AlbumsLikes = likeAlbumSerializer(many=False, read_only=True)
    ArtistsLikes = likeArtistSerializer(many=False, read_only=True)

    class Meta:
        model = UserData
        fields = ['id', 'email', 'username','image', 'MyplayList', 'LikedPlayLists', 'AlbumsLikes', 'ArtistsLikes']


