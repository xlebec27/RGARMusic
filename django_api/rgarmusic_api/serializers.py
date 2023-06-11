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
        fields = ['id','name', 'picture', 'genre']

class TrackSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(),
                                                 many=True)  # ManyToMany поле для артистов

    class Meta:

        model = Track
        fields = ['name', 'duration', 'artist', 'link']

class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), many=True)  # ManyToMany field for artists
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ['name', 'genre', 'artist', 'tracks', 'cover']

    def create(self, validated_data):
        artist = validated_data.pop('artist')
        tracks_data = validated_data.pop('tracks')

        album = Album.objects.create(**validated_data)
        album.artist.set(artist)  # Assign artists to the album using set()

        for track_data in tracks_data:
            artists = track_data.pop('artist')
            tracks = Track.objects.create(album=album, **track_data)
            tracks.artist.set(artists)  # Assign artists to the track using set()
            album.tracks.add(tracks)


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