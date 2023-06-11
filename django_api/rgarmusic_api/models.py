from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, email, password, image=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)

        if image is not None:
            user.image = image

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, image=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self.create_user(email, password, image=image, **extra_fields)

class UserData(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    image = models.FileField(upload_to='static/user_profile_image/', blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=100, unique=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def has_module_perms(self, app_label):
        return self.is_superuser
    def has_perm(self, app_label):
        return self.is_superuser

class Artist(models.Model):
    name = models.CharField(max_length=100, unique=True, primary_key=True)
    genre = models.CharField(max_length=50)
    picture = models.FileField(upload_to='static/artist_avatar/')

class Playlist(models.Model):
    name = models.CharField(max_length=100)
    cover = models.FileField()
    track = models.ForeignKey('Track', related_name="track", on_delete=models.DO_NOTHING,)

class Album(models.Model):
    name = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    cover = models.FileField(upload_to='static/album_avatar/',)
    artist = models.ManyToManyField(Artist, related_name="album_list")
    tracks = models.ManyToManyField('Track', related_name="tracks")

class Track(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ManyToManyField(Artist, related_name="track_list")
    duration = models.CharField(max_length=5)
    album = models.ForeignKey(Album, on_delete=models.DO_NOTHING, related_name="album")
    link = models.FileField(upload_to='static/track/',)

class Tag(models.Model):
    name = models.CharField(max_length=100)





