from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)


class UserData(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(UserData, related_name="user_profile", on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    image = models.URLField()

    def __str__(self):
        return self.user.email


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
