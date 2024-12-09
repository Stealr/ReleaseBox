from rest_framework import serializers
from .models import GameInfo, UnreleasedGamesInfo


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInfo
        fields = ['gameId', 'name',
                  'released', 'rating',
                  'platform', 'genres',
                  'stores', 'metacritic',
                  'esrb_rating', 'tags',
                  'short_screenshots',
                  'imageBackground']


class UnreleasedGamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnreleasedGamesInfo
        fields = ['gameId', 'name',
                  'released', 'platform',
                  'genres',
                  'imageBackground']