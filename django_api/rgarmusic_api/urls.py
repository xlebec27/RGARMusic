from django.urls import path, include, re_path
from rgarmusic_api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    path('', include(router.urls)),
    path('user/artistAll/<pk>/', ArtistDetailView.as_view()), # Вся информация по артисту: альбомы там, треки. Доступ по pk артиста
    path('user/albumAll/<int:pk>/', AlbumDetailView.as_view()), # Вся информация по альбому, все треки. Доступ по pk альбома
    path('user/artists/', allArtist.as_view()), # Просто вывод всех артистов
    path('user/profile/<int:pk>/', userProfile.as_view()), # Профиль юзера
    path('user/listen_track/<int:pk>/', getTrackFile.as_view()), # Получение mp3 по id
    path('user/create/play_list/', CreatePlayList.as_view()), # Создание своего play list
    path('user/play_list/<pk>/', PlayListData.as_view()), # Создание своего play list
    path('user/my-profile/', updateUserProfile.as_view()), # Обновление данных в своем профиле
    path('user/add-track-playlist/<int:pk>/', UpdateDestroyMyPlayList.as_view()), # Добавление и удаление трека по id плейлиста
    path('user/delete-playlist/<int:pk>/', DeletePlayList.as_view()), # Удаление плейлиста по id


    path('user/like/playlist/', LikePlayList.as_view()), # Добавление плейлиста в любимые
    path('user/like/playlist/get/', LikedPlayListView.as_view()), # Вывод всех любимых плейлистов

    path('user/like/album/', LikeAlbum.as_view()), # Добавление альбома в любимые

    path('user/like/artist/', LikeArtist.as_view()), # Добавление артиста в любимые

    path('admin/tags/', tagView.as_view()), # Создание и вывод всех тегов
    path('admin/users/', allUser.as_view()), # Все пользователи
    path('admin/createAlbum/', AlbumCreateView.as_view()), # Создание альбома
    path('admin/createArtist/', CreateArtist.as_view()), # Создание артиста

]

