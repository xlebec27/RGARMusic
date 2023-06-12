from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from rest_framework.exceptions import ValidationError

from rgarmusic_api.models import *


@receiver(post_save, sender=UserData)
def create_liked_playlist(sender, instance, created, **kwargs):
    if created:
        LikedPlayList.objects.create(user=instance)