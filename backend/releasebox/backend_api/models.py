from django.db import models
from django.contrib.auth.models import AbstractUser


class GameInfo(models.Model):
    gameId = models.IntegerField(null=True)
    name = models.CharField(max_length=255)  # Поле для названия игры
    released = models.CharField(max_length=100)  # Поле для даты релиза
    platform = models.CharField(max_length=100, null=True)  # Поле для платформы
    genres = models.CharField(max_length=100)  # Поле для жанра
    metacritic = models.IntegerField(null=True)  # Поле для оценки Metacritic
    imageBackground = models.CharField(max_length=255, null=True)


class UnreleasedGamesInfo(models.Model):
    gameId = models.IntegerField(null=True)
    name = models.CharField(max_length=255)  # Поле для названия игры
    releaseDate = models.CharField(max_length=100)  # Поле для даты релиза
    platform = models.CharField(max_length=100, null=True)  # Поле для платформы
    genres = models.CharField(max_length=100, null=True)  # Поле для жанра
    imageBackground = models.CharField(max_length=255, null=True)


class CustomUser(AbstractUser):
    userCollections = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = 'backend_api_custom_user'

    def add_to_user_collection(self, collection_name, game_id):
        if self.userCollections is None:
            self.userCollections = {'Wishlist': [],
                                    'Playing': [],
                                    'Done': [],
                                    'Favourite': [],
                                    'Abandoned': []}

        if game_id not in self.userCollections[collection_name]:
            self.userCollections[collection_name].append(game_id)

        self.save()
