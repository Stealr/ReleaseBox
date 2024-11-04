from django.db import models


class GameInfo(models.Model):
    gameId = models.IntegerField(null=True)
    name = models.CharField(max_length=255)  # Поле для названия игры
    released = models.CharField(max_length=100)  # Поле для даты релиза
    platform = models.CharField(max_length=100, null=True)  # Поле для платформы
    genres = models.CharField(max_length=100)  # Поле для жанра
    metacritic = models.IntegerField(null=True)  # Поле для оценки Metacritic
    imageBackground = models.CharField(max_length=255, null=True)
"""
class Unreleased_games_info(models.Model):
    name = models.CharField(max_length=255)  # Поле для названия игры
    released = models.CharField(max_length=100)  # Поле для даты релиза
    rating = models.FloatField()  # Поле для рейтинга
    platform = models.CharField(max_length=100)  # Поле для платформы
    genre = models.CharField(max_length=100)  # Поле для жанра
    stores = models.CharField(max_length=255)  # Поле для магазинов
    metacritic = models.IntegerField()  # Поле для оценки Metacritic
"""