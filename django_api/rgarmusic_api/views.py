from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.


@api_view(['GET'])
def get_data(request):
    track = {'name': 'Jigsaw Falling Into Pieces', 'artist': 'Radiohead'}
    return Response(track)
