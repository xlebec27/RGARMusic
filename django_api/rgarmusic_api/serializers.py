from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rgarmusic_api.models import *
from django.views.generic.detail import SingleObjectMixin
from django.contrib.auth.mixins import LoginRequiredMixin


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
        fields = "__all__"

class UserNameDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = ['id', 'email', 'username', 'image']

class WithVisitCounterMixin(SingleObjectMixin):

    def get_object(self, *args, **kwargs):
        obj = super().get_object(*args, **kwargs)
        obj.visitors.add(self.request.user)
        return obj

    def get_context_data(self, *args, **kwargs):
        cd = super().get_context_data(*args, **kwargs)
        cd['visits'] = self.object.visitors.count()
        return cd


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'picture']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class TrackFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        # fields = "__all__"
        fields = ["link"]

# class TrackDataSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Track
#         fields = ['id','name', 'artist', 'album', 'listens']

class TrackSerializer(serializers.ModelSerializer):
    # file = TrackFileSerializer(many=False, required=True)

    class Meta:
        model = Track
        fields = ['id','name', 'artist', 'link']

    def create(self, validated_data):
        artist_data = validated_data.pop('artist')
        tags = validated_data.pop('tags')

        track = Track.objects.create(**validated_data)
        track.artist.set(artist_data)

        return track
    
class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), many=True)
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    track_set = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ['id','name', 'cover', 'artist', 'tags', 'track_set']

    def create(self, validated_data):
        print(validated_data)
        artists = validated_data.pop('artist')
        tags = validated_data.pop('tags')
        tracks_data = validated_data.pop('track_set')

        album = Album.objects.create(**validated_data)
        album.artist.set(artists)
        album.tags.set(tags)

        for track_data in tracks_data:
            # file_data = track_data.pop('file')
            artists = track_data.pop('artist')

            # track_file = TrackFile.objects.create(**file_data)
            # track = Track.objects.create(album=album, file=track_file, **track_data)
            track = Track.objects.create(album=album,  **track_data)

            track.artist.set(artists)
            track.save()

        return album

class TrackGetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Track
        fields = ['id','name',  'artist', 'album']

class AlbumGetSerializer(serializers.ModelSerializer):
    track_set = TrackGetSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    artist = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = "__all__"

    
class TrackGetWithAlbumSerializer(serializers.ModelSerializer):
    album = AlbumGetSerializer(read_only=True)

    class Meta:
        model = Track
        fields = ['id','name',  'artist', 'album']


class AlbumProfileGetSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['id', 'name', 'cover', 'artist']


class ArtistDataSerializer(serializers.ModelSerializer):
    album_list = AlbumGetSerializer(many=True)

    class Meta:
        model = Artist
        fields = ['name', 'album_list', 'track_list', 'picture']

    track_list = serializers.SerializerMethodField()

    def get_track_list(self, obj):
        albums = obj.album_list.all()
        tracks = Track.objects.filter(album__in=albums)
        track_serializer = TrackGetSerializer(tracks, many=True)
        return track_serializer.data


class PlaylistSerializer(serializers.ModelSerializer):
    cover = serializers.FileField(required=False)
    track = TrackGetSerializer(many=True, required=False)
    user = UserNameDataSerializer(required=False, read_only=True)

    class Meta:
        model = Playlist
        fields = "__all__"

    def update(self, instance, validated_data):
        # Get the list of track IDs from the request data
        track_id = self.context['request'].data.get('track_id', [])
        playList_id = self.context['request'].data.get('playList_id', [])

        # Add the tracks to the playlist
        tracks = Track.objects.filter(id__in=track_id)
        playList = Playlist.objects.filter(id__in=playList_id)
        playList.track.add(*tracks)
        playList.save()

        return instance

class PlaylistGetSerializer(serializers.ModelSerializer) :
    cover = serializers.FileField(required=False)
    # track = TrackGetSerializer(many=True, required=False)
    # user = UserDataSerializer(required=False)


    class Meta:
        model = Playlist
        fields = ['id','name', 'cover']


# class likedPlayListSerializer(serializers.ModelSerializer):
#     playlist = playListGetSerializer(many=True)

#     class Meta:
#         model = LikedPlayList
#         exclude = ('user', 'id')

class ArtistGetSerializer(serializers.ModelSerializer):
    picture = serializers.FileField(required=False)

    class Meta:
        model = Artist
        fields = ['name', 'picture']


# class likeArtistSerializer(serializers.ModelSerializer):
#     artist = ArtistSerializer(many=True)

#     class Meta:
#         model = LikeUserArtist
#         exclude = ('id', )

class UserDataSerializer(serializers.ModelSerializer):
    playlist_set = PlaylistGetSerializer(many=True, read_only=True)
    liked_playlists = PlaylistGetSerializer(many=True, read_only=True)
    albums = AlbumProfileGetSerializer(many=True, read_only=True)
    artists = ArtistGetSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = UserData
        fields = ['id', 'email', 'username', 'image', 'tags' ,'playlist_set', 'liked_playlists', 'albums', 'artists']


class StreamSerializer(serializers.ModelSerializer):

    user = UserDataSerializer(many=False, read_only=True)
    track = TrackSerializer(many=False, read_only=True)

    class Meta:
        model = Stream
        fields = ['streams', 'track', 'user']

    def create(self, validated_data):
        track = validated_data.pop('track')
        user = validated_data.pop('user')
        track = Track.objects.filter(id__in=track)
        user = UserData.objects.filter(id__in=user)
        stream = Stream.objects.create(streams = 1)
        stream.user.set(user)
        stream.track.set(track)