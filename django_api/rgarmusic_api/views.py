from typing import Any
from django.db import models
from rest_framework import status, generics, viewsets
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from django.views.generic.detail import DetailView

from rgarmusic_api.permissions import IsOwnerOrAdmin
from rgarmusic_api.serializers import *

import logging
import random
# Get an instance of a logger
logger = logging.getLogger(__name__)

class AlbumCreateView(generics.CreateAPIView): # Создание альбома + запись туда файлов с треками + добавление тегов (Админ)
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAdminUser]

class allUser(generics.ListAPIView): # Все юзеры (Админ)
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAdminUser]

class CreateArtist(generics.CreateAPIView): # Создать артиста (Админ)
    queryset = Artist
    serializer_class = ArtistSerializer
    permission_classes = [IsAdminUser, ]

class tagView(generics.ListCreateAPIView) : # Создание и вывод всех тегов (Админ)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminUser, ]

class ArtistDetailView(generics.RetrieveAPIView): # Все про артиста и его альбомы
    queryset = Artist.objects.all()
    serializer_class = ArtistDataSerializer

class AlbumDetailView(generics.RetrieveAPIView): # Все про альбом и треки в нем
    queryset = Album.objects.all()
    serializer_class = AlbumGetSerializer

class allArtist(generics.ListAPIView): # Все Исполнители
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class userProfile(generics.RetrieveAPIView) : # Профиль юзера
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated, ]

class TrackData(generics.RetrieveAPIView) : # Вся информация о треке
    queryset = Track.objects.all()
    serializer_class = TrackGetWithAlbumSerializer

class updateUserProfile(generics.RetrieveUpdateAPIView) : # Обновление данных юзера
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsOwnerOrAdmin, ]

    def get_object(self):
        return self.request.user
    
class UserAdmin(APIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        return Response({'is_admin': self.request.user.is_staff})


class getTrackFile(APIView) : # Трек по id
    queryset = Track.objects.all()
    # serializer_class = TrackFileSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, *args, **kwargs):
        user = self.request.user
        track_id = kwargs.get('pk')
        try:
            track = Track.objects.get(id=track_id)
            try:
                stream = Stream.objects.get(track=track_id, user=user.id)
            except:
                stream = Stream.objects.create(user=user, track=track, streams = 1)
            else:
                stream.streams += 1
            stream.save()
            track.listens += 1
            return Response({'link': str(track.link)}, status=200)
        except:
            return Response({'message': 'Track not found.'}, status=404)


class CreatePlayList(generics.CreateAPIView) : # Создание плейлиста
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):
        user = self.request.user
        playlist = self.request.data
        print(playlist)
        playlist = Playlist.objects.create(name = playlist["name"], cover = playlist["cover"], user=user)
        playlist.save()

class PlayListData(generics.RetrieveAPIView) : # Вся информация о плейлисте
    queryset = Playlist.objects.all()
    # queryset = LikedPlayList
    serializer_class = PlaylistSerializer

class DeletePlayList(generics.RetrieveDestroyAPIView) : # Удаление плейлиста
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrAdmin, ]

class UpdateDestroyMyPlayList(generics.RetrieveUpdateDestroyAPIView) : # Добавление и удаление трека по id трека и id плейлиста
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrAdmin, ]

    def update(self, request, *args, **kwargs):
        playlist_id = request.data.get('playlist_id')
        track_id = request.data.get('track_id')

        try:
            playlist = Playlist.objects.get(id=playlist_id)
            track = Track.objects.get(id=track_id)

            playlist.track.add(track)
            playlist.save()

            serializer = self.get_serializer(playlist)
            return Response(serializer.data)
        except Playlist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=404)
        except Track.DoesNotExist:
            return Response({'message': 'Track not found.'}, status=404)

    def destroy(self, request, *args, **kwargs):
        playlist_id = kwargs.get('pk')
        track_id = request.data.get('track_id')

        try:
            playlist = Playlist.objects.get(id=playlist_id)
            track = Track.objects.get(id=track_id)

            playlist.track.remove(track)
            playlist.save()

            serializer = self.get_serializer(playlist)
            return Response(serializer.data)
        except Playlist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=404)
        except Track.DoesNotExist:
            return Response({'message': 'Track not found.'}, status=404)

    
class LikePlayList(APIView):
    def post(self, request):
        user = request.user
        id = request.data.get('id')

        try:
            playlist = Playlist.objects.get(id=id)
        except Playlist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=status.HTTP_404_NOT_FOUND)

        # liked_playlists, created = LikedPlayList.objects.get_or_create(user=user)
        # liked_playlists.playlist.add(playlist)
        user.liked_playlists.add(playlist)

        serializer = PlaylistGetSerializer(playlist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = self.request.user
        n = self.request.GET.get('n')
        id = self.request.GET.get('id')
        if id is None:
            if n is None:
                result = user.liked_playlists.all()
            else:
                result = user.liked_playlists.all()[:int(n)]
            serializer = PlaylistGetSerializer(result, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            result = user.playlist_set.filter(id=id).exists()
            return Response({'result': result}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = request.data.get('id')
        user = request.user

        try:
            playlist = Playlist.objects.get(id=id)
        except Playlist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=404)

        user.liked_playlists.remove(playlist)

        serializer = PlaylistSerializer(playlist)

        return Response(serializer.data, status = 204)

    

class LikeAlbum(APIView):
    def post(self, request):
        user = request.user
        print(request.data)
        id = request.data.get('id')
        print(id)

        try:
            album = Album.objects.get(id=id)
        except Album.DoesNotExist:
            return Response({'message': 'Album not found.'}, status=status.HTTP_404_NOT_FOUND)

        # liked_album, created = LikeUserAlbum.objects.get_or_create(user=user)
        # liked_album.album.add(album)
        user.albums.add(album)

        serializer = AlbumGetSerializer(album)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = self.request.user
        n = self.request.GET.get('n')
        id = self.request.GET.get('id')
        if id is None:
            if n is None:
                result = user.albums.all()
            else:
                result = user.albums.all()[:int(n)]
            serializer = AlbumGetSerializer(result, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            result = user.albums.filter(id=id).exists()
            print(result)
            return Response({'result': result}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = request.data.get('id')
        user = request.user

        try:
            album = Album.objects.get(id=id)
        except Album.DoesNotExist:
            return Response({'message': 'Album not found.'}, status=404)

        user.albums.remove(album)

        serializer = AlbumSerializer(album)

        return Response(serializer.data, status = status.HTTP_200_OK)

class LikeArtist(APIView):
    def post(self, request):
        user = request.user
        id = request.data.get('id')

        try:
            artist = Artist.objects.get(name=id)
        except Artist.DoesNotExist:
            return Response({'message': 'Artist not found.'}, status=status.HTTP_404_NOT_FOUND)

        print(user)
        user.artists.add(artist)

        serializer = ArtistGetSerializer(artist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = self.request.user
        n = self.request.GET.get('n')
        id = self.request.GET.get('id')
        if id is None:
            if n is None:
                result = user.artists.all()
            else:
                result = user.artists.all()[:int(n)]
            serializer = ArtistGetSerializer(result, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            result = user.artists.filter(name=id).exists()
            print(result)
            return Response({'result': result}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = request.data.get('id')
        user = request.user

        try:
            artist = Artist.objects.get(name=id)
        except Artist.DoesNotExist:
            return Response({'message': 'Artist not found.'}, status=404)

        user.artists.remove(artist)

        serializer = ArtistSerializer(artist)

        return Response(serializer.data, status = status.HTTP_200_OK)


class LikeTags(APIView):
    def post(self, request):
        user = request.user
        id = request.data.get('id')
        try:
            tags = Tag.objects.get(id=id)
        except Tag.DoesNotExist:
            return Response({'message': 'Tag not found.'}, status=status.HTTP_404_NOT_FOUND)

        user.tags.add(tags)

        serializer = TagSerializer(tags)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = self.request.user
        n = self.request.GET.get('n')
        if n is None:
            result = user.tags.all()
        else:
            result = user.tags.all()[:int(n)]
        serializer = TagSerializer(result, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = request.data.get('id')
        user = request.user

        try:
            tag = Tag.objects.get(id=id)
        except Tag.DoesNotExist:
            return Response({'message': 'Tag not found.'}, status=404)

        user.tags.remove(tag)

        serializer = TagSerializer(tag)

        return Response(serializer.data, status = status.HTTP_200_OK)
    
class LikeUsers(APIView):
    def post(self, request):
        user = request.user
        id = request.data.get('id')
        try:
            user = UserData.objects.get(id=id)
        except UserData.DoesNotExist:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        user.users.add(user)

        serializer = UserDataSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        user = self.request.user
        n = self.request.GET.get('n')
        id = self.request.GET.get('id')
        if id is None:
            if n is None:
                result = user.users.all()
            else:
                result = user.users.all()[:int(n)]
            serializer = UserDataSerializer(result, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            result = user.users.filter(id=id).exists()
            return Response({'result': result}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = request.data.get('id')
        user = request.user

        try:
            user = UserData.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=404)

        user.users.remove(user)

        serializer = UserDataSerializer(user)

        return Response(serializer.data, status = status.HTTP_200_OK)


class AllTags(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ArtistSearch(generics.ListAPIView):
    serializer_class=ArtistGetSerializer

    def get_queryset(self):
        artists = Artist.objects.filter(name__icontains=self.request.GET.get('s', ''))
        return artists
        

class AlbumSearch(generics.ListAPIView):
    serializer_class=AlbumGetSerializer

    def get_queryset(self):
        albums = Album.objects.filter(name__icontains=self.request.GET.get('s', ''))
        return albums
    

class TrackSearch(generics.ListAPIView):
    serializer_class=TrackGetWithAlbumSerializer

    def get_queryset(self):
        tracks = Track.objects.filter(name__icontains=self.request.GET.get('s', ''))
        return tracks
    

class PlaylistSearch(generics.ListAPIView):
    serializer_class=PlaylistGetSerializer

    def get_queryset(self):
        playlists = Playlist.objects.filter(name__icontains=self.request.GET.get('s', ''))
        return playlists
    

class UserSearch(generics.ListAPIView):
    serializer_class=UserDataSerializer

    def get_queryset(self):
        users = UserData.objects.filter(username__icontains=self.request.GET.get('s', ''))
        return users
    

class GetRecommendation(APIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class=AlbumGetSerializer(many=True)

    def get(self, request):
        user = request.user
        tags = user.tags.values_list('pk', flat=True)
        n = self.request.GET.get('n')
        try:
            if n is None:
                album = random.choice(Album.objects.filter(tags=Tag.objects.get(pk=random.choice(tags))))
                serializer = AlbumGetSerializer(album)
            else:
                album = random.sample(list(Album.objects.filter(tags=Tag.objects.get(pk=random.choice(tags)))), int(n))
                serializer = AlbumGetSerializer(album, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message': str(e)}, status=400)
        
    
class GetLatestAlbums(generics.ListAPIView):
    serializer_class=AlbumGetSerializer
        
    def get_queryset(self):
        n = int(self.request.GET.get('n'))
        albums = Album.objects.all().order_by('-id')[:n:-1]
        return albums
    
class GetUserPlaylists(generics.ListAPIView):
    serializer_class=PlaylistGetSerializer

    def get_queryset(self):
        user = self.request.user
        return user.playlist_set