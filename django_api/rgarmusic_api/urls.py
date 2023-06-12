from django.urls import path, include, re_path
from rgarmusic_api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    path('', include(router.urls)),
    path('user/artistAll/<pk>/', ArtistDetailView.as_view()), # Вся информация по артисту: альбомы там, треки. Доступ по pk артиста
    path('user/albumAll/<int:pk>/', AlbumDetailView.as_view()), # Вся информация по альбому, все треки. Доступ по pk альбома
    path('user/artists/', allArtist.as_view()), # Просто вывод всех артистов
    path('user/profile/<int:pk>', userProfile.as_view()),

    path('admin/users/', allUser.as_view()), # Все пользователи
    path('admin/createAlbum/', AlbumCreateView.as_view()), # Создание альбома
    path('admin/createArtist/', CreateArtist.as_view()), # Создание артиста

]

