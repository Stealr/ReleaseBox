from django.db import models

class GameInfo(models.Model):
    name = models.CharField(max_length=255)  # Поле для названия игры
    released = models.CharField(max_length=100)  # Поле для даты релиза
    rating = models.FloatField()  # Поле для рейтинга
    platform = models.CharField(max_length=100)  # Поле для платформы
    genre = models.CharField(max_length=100)  # Поле для жанра
    stores = models.CharField(max_length=255)  # Поле для магазинов
    metacritic = models.IntegerField()  # Поле для оценки Metacritic

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