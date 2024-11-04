from rest_framework import serializers
from .models import GameInfo

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInfo
        fields = ['gameId', 'name',
                  'released', 'platform',
                  'genres', 'metacritic',
                  'imageBackground']