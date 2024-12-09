from rest_framework import serializers
from .models import GameInfo

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInfo
        fields = ['name', 'released',
                  'rating', 'platform',
                  'genre', 'stores',
                  'metacritic']