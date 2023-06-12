from rest_framework import status, generics, viewsets
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from rgarmusic_api.permissions import IsOwnerOrAdmin
from rgarmusic_api.serializers import *

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

class updateUserProfile(generics.RetrieveUpdateAPIView) : # Обновление данных юзера
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsOwnerOrAdmin, ]

    def get_object(self):
        return self.request.user

class getTrackFile(generics.RetrieveAPIView) : # Трек по id
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticated, ]

class CreatePlayList(generics.CreateAPIView) : # Создание плейлиста
    queryset = MyPlaylist
    serializer_class = playListSerializer
    permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class PlayListData(generics.RetrieveAPIView) : # Вся информация о плейлисте
    queryset = MyPlaylist
    # queryset = LikedPlayList
    serializer_class = playListSerializer

class DeletePlayList(generics.RetrieveDestroyAPIView) : # Удаление плейлиста
    queryset = MyPlaylist
    serializer_class = playListSerializer
    permission_classes = [IsOwnerOrAdmin, ]

class UpdateDestroyMyPlayList(generics.RetrieveUpdateDestroyAPIView) : # Добавление и удаление трека по id трека и id плейлиста
    queryset = MyPlaylist
    serializer_class = playListSerializer
    permission_classes = [IsOwnerOrAdmin, ]

    def update(self, request, *args, **kwargs):
        playlist_id = kwargs.get('pk')
        track_id = request.data.get('track_id')

        try:
            playlist = MyPlaylist.objects.get(id=playlist_id)
            track = Track.objects.get(id=track_id)

            playlist.track.add(track)
            playlist.save()

            serializer = self.get_serializer(playlist)
            return Response(serializer.data)
        except MyPlaylist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=404)
        except Track.DoesNotExist:
            return Response({'message': 'Track not found.'}, status=404)

    def destroy(self, request, *args, **kwargs):
        playlist_id = kwargs.get('pk')
        track_id = request.data.get('track_id')

        try:
            playlist = MyPlaylist.objects.get(id=playlist_id)
            track = Track.objects.get(id=track_id)

            playlist.track.remove(track)
            playlist.save()

            serializer = self.get_serializer(playlist)
            return Response(serializer.data)
        except MyPlaylist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=404)
        except Track.DoesNotExist:
            return Response({'message': 'Track not found.'}, status=404)

class LikePlayList(APIView): # Лайк Плей Листа
    def post(self, request):
        user = request.user
        playlist_id = request.data.get('playlist_id')

        try:
            playlist = MyPlaylist.objects.get(id=playlist_id)
        except MyPlaylist.DoesNotExist:
            return Response({'message': 'Playlist not found.'}, status=status.HTTP_404_NOT_FOUND)

        liked_playlists, created = LikedPlayList.objects.get_or_create(user=user)
        liked_playlists.playlist.add(playlist)

        serializer = likedPlayListSerializer(liked_playlists)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LikedPlayListView(generics.ListAPIView): # Все Лайкнутые Плей листы юзера
    serializer_class = likedPlayListSerializer

    def get_queryset(self):
        user = self.request.user
        return LikedPlayList.objects.filter(user=user)

class LikeAlbum(APIView): # Лайк альбома
    def post(self, request):
        user = request.user
        album_id = request.data.get('album_id')

        try:
            album = Album.objects.get(id=album_id)
        except MyPlaylist.DoesNotExist:
            return Response({'message': 'Album not found.'}, status=status.HTTP_404_NOT_FOUND)

        liked_album, created = LikeUserAlbum.objects.get_or_create(user=user)
        liked_album.album.add(album)

        serializer = likeAlbumSerializer(liked_album)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LikeArtist(APIView): # Лайк артиста
    def post(self, request):
        user = request.user
        artist_id = request.data.get('artist_id')

        try:
            artist = Artist.objects.get(name=artist_id)
        except MyPlaylist.DoesNotExist:
            return Response({'message': 'Album not found.'}, status=status.HTTP_404_NOT_FOUND)

        liked_artist, created = LikeUserArtist.objects.get_or_create(user=user)
        liked_artist.artist.add(artist)

        serializer = likeArtistSerializer(liked_artist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Выдавать треки по рекомендации