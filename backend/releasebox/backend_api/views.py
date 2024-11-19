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
from django.db.models import Q


def getGame(request, id):
    url = 'https://api.rawg.io/api/games/' + str(id) + '?key=d6c9714af1784481affffd3493eff327'
    response = requests.get(url)
    game = response.json()
    item = {
        'gameId': game.get('id'),
        'name': game.get('name'),
        'released': game.get('released'),
        'rating': game.get('rating'),
        'platform': ', '.join([platform.get('platform').get('name') for platform in game.get('parent_platforms', [])]),
        'genres': ', '.join([genre.get('name') for genre in game.get('genres', [])]),
        'stores': ', '.join([store.get("store").get('name') for store in game.get('stores', [])]),
        'metacritic': game.get('metacritic'),
        'publishers': ', '.join([pub.get('name') for pub in game.get('publishers', [])]),
        'developers': ', '.join([dev.get('name') for dev in game.get('developers', [])]),
        'tags': ', '.join([tag.get('name') for tag in game.get('tags', [])]),
        'imageBackground': game.get('background_image'),
        'system_requirements': {
                                platform.get("platform").get("name"): {
                                    key: platform.get("requirements", {}).get(key)
                                    for key in platform.get("requirements", {}).keys()
                                }
                                for platform in game.get("platforms", [])
                                },
        'description': game.get('description_raw')
    }
    return JsonResponse(item)


class GameInfoView(APIView):
    def get(self, request):
        output = [
            {
                'gameId': output.gameId,
                'name': output.name,
                'released': output.released,
                'rating': output.rating,
                'platform': output.platform,
                'genres': output.genres,
                'stores': output.stores,
                'metacritic': output.metacritic,
                'esrb_rating': output.esrb_rating,
                'tags': output.tags,
                "short_screenshots": output.short_screenshots,
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
    # При POST запросе данные передаются в userSerializer,
    # который создает экземпляр класса
    queryset = CustomUser.objects.all()
    serializer = UserSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    # После регистрации пользователь может отправить POST на
    # path(token/), которые проверит данные с бд
    # чтобы получить токен
    pass


@api_view(['POST'])
def addToCollection(request):
    user_id = request.data.get('user_id')
    collection_name = request.data.get('collection_name')
    game_id = request.data.get('gameId')
    user_rating = request.data.get('user_rating')

    user = CustomUser.objects.get(id=user_id)
    if user_rating:
        user.add_to_user_collection(collection_name, game_id, user_rating)
    else:
        user.add_to_user_collection(collection_name, game_id)
    return Response({'message': 'Game added to collection'})


@api_view(['GET'])
def filtration(request):
    if request.data.get('filtration') == 'month':
        return GameInfo.objects.filter(
            released__year=request.data.get('year'),
            released__month=request.data.get('month')
        )
    if request.data.get('filtration') == 'released':
        return GameInfo.objects.filter(
            released__gte=str(request.data.get('start')),
            released__lte=str(request.data.get('end'))
        )
    if request.data.get('filtration') == 'metacritic':
        return GameInfo.objects.filter(
            metacritic__gte=str(request.data.get('start')),
            metacritic_lte=str(request.data.get('end'))
        )
    if request.data.get('filtration') == 'tags':
        filters = str(request.data.get('tags')).split(',')
        query = Q()
        for filter in filters:
            filter = filter.strip()
            query &= Q(tags__icontains=filter)
        return GameInfo.objects.filter(query)
    if request.data.get('filtration') == 'platform':
        filters = str(request.data.get('platform')).split(',')
        query = Q()
        for filter in filters:
            filter = filter.strip()
            query &= Q(platform__icontains=filter)
        return GameInfo.objects.filter(query)
    if request.data.get('filtration') == 'genres':
        filters = str(request.data.get('genres')).split(',')
        query = Q()
        for filter in filters:
            filter = filter.strip()
            query &= Q(genres__icontains=filter)
        return GameInfo.objects.filter(query)


@api_view(['GET'])
def sorting(request):
    return GameInfo.objects.all().order_by(str(request.data.get('sorting')))