from rest_framework.views import APIView
from rest_framework.response import Response
from .models import GameInfo, UnreleasedGamesInfo, CustomUser
from .gameSerializer import GameSerializer, UnreleasedGamesSerializer
from .userSerializer import UserSerializer
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


def getGame(request, id):
    url = 'https://api.rawg.io/api/games/'+ str(id) + '?key=d6c9714af1784481affffd3493eff327'
    response = requests.get(url)
    game = response.json()
    item = {
        'gameId': game.get('id'),
        'name': game.get('name'),
        'rating': game.get('rating'),
        'released': game.get('released'),
        'platform': ', '.join([platform.get('platform').get('name') for platform in game.get('parent_platforms', [])]),
        'genres': ', '.join([genre.get('name') for genre in game.get('genres', [])]),
        'metacritic': game.get('metacritic'),
        'publishers': ', '.join([pub.get('name') for pub in game.get('publishers', [])]),
        'developers': ', '.join([dev.get('name') for dev in game.get('developers', [])]),
        'imageBackground': game.get('background_image'),
        'description': game.get('description_raw')
    }
    return JsonResponse(item)


class GameInfoView(APIView):
    def get(self, request):
        output = [
            {
                'id': output.gameId,
                'name': output.name,
                'released': output.released,
                'platform': output.platform,
                'genres': output.genres,
                'metacritic': output.metacritic,
                'imageBackground': output.imageBackground
            } for output in GameInfo.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class UnreleasedGameInfoView(APIView):
    def get(self, request):
        output = [
            {
                'id': output.gameId,
                'name': output.name,
                'release date': output.releaseDate,
                'platform': output.platform,
                'genres': output.genres,
                'imageBackground': output.imageBackground
            } for output in UnreleasedGamesInfo.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UnreleasedGamesSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    pass


@api_view(['POST'])
def addToCollection(request):
    user_id = request.data.get('user_id')
    collection_name = request.data.get('collection_name')
    game_id = request.data.get('gameId')

    user = CustomUser.objects.get(id=user_id)
    user.add_to_user_collection(collection_name, game_id)
    return Response({'message': 'Game added to collection'})
