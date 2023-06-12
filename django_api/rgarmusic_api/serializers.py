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
        fields = ['id','email', 'password']

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'picture', 'genre']

class TrackFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackFile
        fields = "__all__"
        # fields = ["test"]


class TrackSerializer(serializers.ModelSerializer):
    file = TrackFileSerializer(many=False, required=True)

    class Meta:
        model = Track
        fields = ['name', 'duration', 'file', 'artist']

    def create(self, validated_data):
        file_data = validated_data.pop('file')
        artist_data = validated_data.pop('artist')

        track_file = TrackFile.objects.create(**file_data)
        track = Track.objects.create(file=track_file, **validated_data)
        track.artist.set(artist_data)

        return track
class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), many=True)  # ManyToMany field for artists
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ['name', 'genre', 'artist', 'tracks', 'cover']

        # fields = ['name', 'genre', 'artist', 'tracks']

    def create(self, validated_data):
        artists = validated_data.pop('artist')
        tracks_data = validated_data.pop('tracks')

        album = Album.objects.create(**validated_data)
        album.artist.set(artists)

        for track_data in tracks_data:
            file_data = track_data.pop('file')
            artists = track_data.pop('artist')

            track_file = TrackFile.objects.create(**file_data)
            track = Track.objects.create(album=album, file=track_file, **track_data)
            track.artist.set(artists)
            track.save()

            album.tracks.add(track)
        return album

class ArtistDataSerializer(serializers.ModelSerializer):
    album_list = AlbumSerializer(many=True)

    class Meta:
        model = Artist
        fields = ['name', 'genre', 'album_list', 'track_list']

    track_list = serializers.SerializerMethodField()

    def get_track_list(self, obj):
        albums = obj.album_list.all()
        tracks = Track.objects.filter(album__in=albums)
        track_serializer = TrackSerializer(tracks, many=True)
        return track_serializer.data