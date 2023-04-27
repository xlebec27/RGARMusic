from django.db import models

# Create your models here.


class Artist(models.Model):
    name = models.CharField(max_length=100)
    picture = models.URLField()


class Playlist(models.Model):
    name = models.CharField(max_length=100)
    cover = models.URLField()


class Album(models.Model):
    name = models.CharField(max_length=100)
    cover = models.URLField()
    artist = models.ManyToManyField(Artist, related_name="album_list", blank=True)


class Track(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ManyToManyField(Artist, related_name="track_list", blank=True)
    playlist = models.ManyToManyField(Playlist, related_name="track_list", blank=True)
    duration = models.DurationField()
    album = models.ForeignKey(Album, on_delete=models.DO_NOTHING, related_name="track_list")
    link = models.URLField()


class Tag(models.Model):
    name = models.CharField(max_length=100)
