from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rgarmusic_api.serializers import *


class ArtistView(ModelViewSet):
    def get_queryset(self):
        return Artist.objects.all()

    serializer_class = ArtistSerializer
    permission_classes = IsAuthenticated

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            data=request.data, instance=instance, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        item = self.get_object()
        serializer = self.get_serializer(item)
        return Response(serializer.data)


class AlbumView(ModelViewSet):
    # def get_queryset(self):
    #     return Album.objects.all()
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = IsAuthenticated

    def create(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


# class RegisterView(APIView):
#     permission_classes = (AllowAny, )
#
#     def post(self, request):
#         profile_serializer = UserProfileSerializer(data=request.data)
#         user_data_serializer = UserDataSerializer(data=request.data['user'])
#         if not user_data_serializer.is_valid():
#             return Response(user_data_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         if not profile_serializer.is_valid():
#             return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         profile_serializer.save()
#         return Response(profile_serializer.data, status=status.HTTP_201_CREATED)


class RegisterView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        registration_serializer = RegistrationSerializer(data=request.data)
        if not registration_serializer.is_valid():
            return Response(registration_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        registration_serializer.save()
        return Response(registration_serializer.data, status=status.HTTP_201_CREATED)
