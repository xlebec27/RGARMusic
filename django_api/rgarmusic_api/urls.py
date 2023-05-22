from django.urls import path, include, re_path
from rgarmusic_api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

router.register("artist", ArtistView, basename='Artist')
router.register("album", AlbumView, basename='Album')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='Register'),
    path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.authtoken')),
]

