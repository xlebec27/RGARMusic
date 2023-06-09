from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rgarmusic_api.models import *


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['email', 'password']


class RegistrationSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    username = serializers.CharField()
    image = serializers.URLField()

    def create(self, validated_data):
        user = UserData(email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        UserProfile.objects.create(username=validated_data['username'], image=validated_data['image'], user_id=user.id)
        return validated_data


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserDataSerializer(required=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'username', 'image']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        print(user_data)
        password = user_data.pop('password')
        password = make_password(password)
        user = UserData.objects.create(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data, password=password)
        return user_profile


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'picture', 'album_list']


class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(many=True)

    # artist = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Album
        fields = ['name', 'cover', 'artist']

    def create(self, validated_data):
        # print(validated_data)
        artist_data = validated_data.pop('artist', [])
        new_album = Album.objects.create(**validated_data)
        # print(artist_data)

        for artist in artist_data:
            print(Artist.objects.get(name=artist["name"]))
            artist_obj = Artist.objects.get(name=artist["name"])
            new_album.artist.add(artist_obj)

        return new_album


# class AlbumCreateSerializer(AlbumMainSerializer)


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"
