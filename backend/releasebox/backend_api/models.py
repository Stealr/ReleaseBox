from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin


class GameInfo(models.Model):
    gameId = models.IntegerField(blank=False, unique=True)
    name = models.CharField(max_length=255, blank=False)  # Поле для названия игры
    released = models.CharField(max_length=100, blank=False)  # Поле для даты релиза
    rating = models.CharField(max_length=5, blank=True, default='No data')
    platform = models.CharField(max_length=100, blank=True, default='No data')  # Поле для платформы
    genres = models.CharField(max_length=100, blank=True, default='No data')  # Поле для жанра
    stores = models.CharField(max_length=500, blank=True, default='No data')
    metacritic = models.CharField(max_length=3, blank=False)  # Поле для оценки Metacritic
    esrb_rating = models.CharField(max_length=255, blank=True, default='No data')
    tags = models.CharField(max_length=1000, blank=True, default='No data')
    short_screenshots = models.CharField(max_length=3000, blank=True, default='No data')
    imageBackground = models.CharField(max_length=1000, blank=True, default='No data')


class UnreleasedGamesInfo(models.Model):
    gameId = models.IntegerField(null=True)
    name = models.CharField(max_length=255)  # Поле для названия игры
    releaseDate = models.CharField(max_length=100)  # Поле для даты релиза
    platform = models.CharField(max_length=100, null=True)  # Поле для платформы
    genres = models.CharField(max_length=100, null=True)  # Поле для жанра
    imageBackground = models.CharField(max_length=255, null=True)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'backend_api_custom_user'

    username = models.CharField(max_length=50, unique=True) # unique на уровне бд
    email = models.EmailField(max_length=255, validators=[EmailValidator()], unique=True)
    password = models.CharField(max_length=128)
    logo = models.CharField(max_length=300, null=True)
    userCollections = models.JSONField(default=dict, null=True, blank=True)

    REQUIRED_FIELDS = ['email', 'password']  # Укажите обязательные поля
    USERNAME_FIELD = 'username'  # Поле, используемое для аутентификации
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_passwords(self, raw_password):
        return check_password(raw_password, self.password)

    def add_to_user_collection(self, collection_name, game_id, user_rating=None):
        if self.userCollections == "":
            self.userCollections = {
                'Wishlist': [],
                'Playing': [],
                'Done': [],
                'Favourite': [],
                'Abandoned': []
            }
        recur_item = self.check_recur_collection(game_id)
        if recur_item:
            self.delete_from_user_collection(recur_item[0], game_id)

        self.userCollections[collection_name].append([game_id, user_rating])
        self.save()

    def delete_from_user_collection(self, collection, game_id):
        # Находим элемент для удаления
        item_to_remove = next((item for item in self.userCollections[collection] if item[0] == game_id), None)
        if item_to_remove:
            self.userCollections[collection].remove(item_to_remove)
            self.save()

    def check_recur_collection(self, game_id):
        # Проверка наличия игры в любых коллекциях
        for collection in self.userCollections.keys():
            collection_items = self.userCollections[collection]
            recur_item = next((item for item in collection_items if item[0] == game_id), None)
            if recur_item:
                return collection, recur_item
        self.save()
