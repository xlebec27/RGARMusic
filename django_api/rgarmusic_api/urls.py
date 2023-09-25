from django.urls import path, include, re_path
from rgarmusic_api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    path('', include(router.urls)),
    path('user/artist/<pk>/', ArtistDetailView.as_view()), # Вся информация по артисту: альбомы там, треки. Доступ по pk артиста
    path('user/artists/', allArtist.as_view()), # Просто вывод всех артистов
    path('user/profile/<int:pk>/', userProfile.as_view()), # Профиль юзера
    path('user/trackfile/<int:pk>/', getTrackFile.as_view()), # Получение mp3 по id
    path('user/track/<pk>/', TrackData.as_view()),
    path('user/create/playlist/', CreatePlayList.as_view()), # Создание своего play list
    path('user/my-profile/', updateUserProfile.as_view()), # Обновление данных в своем профиле
    path('user/is-admin/', UserAdmin.as_view()),

    
    path('user/playlist/update/', UpdateDestroyMyPlayList.as_view()), # Добавление и удаление трека по id плейлиста
    path('user/playlist/delete/<int:pk>/', DeletePlayList.as_view()), # Удаление плейлиста по id
    path('user/playlist/<pk>/', PlayListData.as_view()), # Информация о плейлисте
    path('user/user-playlist/', GetUserPlaylists.as_view()), # Информация о плейлисте


    path('user/album/<int:pk>/', AlbumDetailView.as_view()), # Вся информация по альбому, все треки. Доступ по pk альбома


    path('user/all-tags/', AllTags.as_view()), # Все теги


    path('user/like/playlist/', LikePlayList.as_view()), # Добавление, удаление плейлиста в любимые и получение списка плейлистов
    path('user/like/album/', LikeAlbum.as_view()), # Добавление, удаление альбома в любимые и получение списка альбомов
    path('user/like/artist/', LikeArtist.as_view()), # Добавление, удаление артиста в любимые и получение списка артистов
    path('user/like/tag/', LikeTags.as_view()), # Добавление, удаление тега юзеру и вывод списка тегов
    path('user/like/users/', LikeTags.as_view()), # Добавление, удаление  лайкнутых пользователей юзеру и вывод их списка

    path('admin/tags/', TagView.as_view()), # Создание и вывод всех тегов
    path('admin/users/', allUser.as_view()), # Все пользователи
    path('admin/create-album/', AlbumCreateView.as_view()), # Создание альбома
    path('admin/create-artist/', CreateArtist.as_view()), # Создание артиста
    path('admin/delete-album/<int:pk>/', AlbumDeleteView.as_view()),
    path('admin/delete-artist/<str:pk>/', ArtistDeleteView.as_view()),
    path('admin/delete-tag/<int:pk>/', TagDeleteView.as_view()),

    path('user/artists/search/', ArtistSearch.as_view()), # Поиск артиста
    path('user/albums/search/', AlbumSearch.as_view()), # Поиск альбома
    path('user/playlists/search/', PlaylistSearch.as_view()), # Поиск плейлиста
    path('user/users/search/', UserSearch.as_view()), # Поиск пользователя
    path('user/tracks/search/', TrackSearch.as_view()), # Поиск треков
    path('user/recommend/', GetRecommendation.as_view()), # Получение рекомендаций альбомов
    path('user/albums/get-last/', GetLatestAlbums.as_view()), # Получение последних n альбомов
 
]

