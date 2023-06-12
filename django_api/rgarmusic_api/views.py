from rest_framework import status, generics, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from rgarmusic_api.permissions import IsOwnerOrAdmin
from rgarmusic_api.serializers import *

class AlbumCreateView(generics.CreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAdminUser]

class CreateArtist(generics.CreateAPIView):
    queryset = Artist
    serializer_class = ArtistSerializer
    permission_classes = [IsAdminUser, ]

class ArtistDetailView(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistDataSerializer

class AlbumDetailView(generics.RetrieveAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class allUser(generics.ListAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsAdminUser]

class allArtist(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class userProfile(generics.RetrieveUpdateAPIView) :
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    permission_classes = [IsOwnerOrAdmin, ]


