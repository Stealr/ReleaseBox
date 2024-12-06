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
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """ Переопределяем стандартный TokenObtainPairSerializer, чтобы использовать CustomUser модель. """

    def validate(self, attrs):
        data = super().validate(attrs)

        # Добавляем user_id в ответ
        data['user_id'] = self.user.id
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Добавляем дополнительные данные в токен
        token['username'] = user.username
        token['email'] = user.email

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    # После регистрации пользователь может отправить POST на
    # path(token/), которые проверит данные с бд
    # чтобы получить токен
    serializer_class = CustomTokenObtainPairSerializer


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
    try:
        item['short_screenshots'] = GameInfo.objects.filter(gameId=game.get('id')).values_list('short_screenshots', flat=True).get()
    except GameInfo.DoesNotExist:
        item['short_screenshots'] = game.get('background_image_additional')
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
                'released': output.released,
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
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


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


@api_view(['POST'])
def deleteFromCollection(request):
    user_id = request.data.get('user_id')
    collection_name = request.data.get('collection_name')
    game_id = request.data.get('gameId')

    user = CustomUser.objects.get(id=user_id)
    user.delete_from_user_collection(collection_name, game_id)
    return Response({'message': 'Game deleted from collection'})


@api_view(['GET'])
def filtration(request):
    filters = request.query_params.get('filtration', {})
    query = Q()
    for filter_type, filter_values in filters.items():
        if filter_type == 'month':
            year = filter_values[0]
            month = str(filter_values[1])
            query &= Q(released__startswith=f"{year}-{month.zfill(2)}")
        if filter_type == 'released':
            start = filter_values[0]
            end = filter_values[1]
            query &= Q(released__gte=start, released__lte=end)
        if filter_type == 'metacritic':
            start = filter_values[0]
            end = filter_values[1]
            query &= Q(metacritic__gte=start, metacritic__lte=end)
        if filter_type == 'tags':
            tags = [tag.strip() for tag in filter_values]
            for tag in tags:
                query &= Q(tags__icontains=tag)
        if filter_type == 'platform':
            platforms = [platform.strip() for platform in filter_values]
            for platform in platforms:
                query &= Q(platform__icontains=platform)
        if filter_type == 'genres':
            genres = [genre.strip() for genre in filter_values]
            for genre in genres:
                query &= Q(genres__icontains=genre)

    # Fetch the filtered data
    filtered_games = GameInfo.objects.filter(query)

    # Serialize the data (if needed) and return it as a Response
    data = list(filtered_games.values())  # Convert QuerySet to a list of dictionaries
    return Response(data)


@api_view(['GET'])
def sorting(request):
    # Получаем параметры сортировки из запроса
    sort_field = request.query_params.get('sorting+')
    sort_field_desc = request.query_params.get('sorting-')

    # Сортируем данные на основе параметров
    if sort_field:
        games = GameInfo.objects.all().order_by(sort_field)
    elif sort_field_desc:
        games = GameInfo.objects.all().order_by(f'-{sort_field_desc}')
    else:
        return Response({"error": "No sorting field provided"}, status=400)

    response_data = []
    for game in games:
        response_data.append({
            'gameId': game.gameId,
            'name': game.name,
            'released': game.released,
            'rating': game.rating,
            'platform': game.platform,
            'genres': game.genres,
            'stores': game.stores,
            'metacritic': game.metacritic,
            'esrb_rating': game.esrb_rating,
            'tags': game.tags,
            "short_screenshots": game.short_screenshots,
            'imageBackground': game.imageBackground
        })
    return Response(response_data)


@api_view(['GET'])
def get_user(request):
    user_id = request.query_params.get('user_id')
    if user_id:
        user = CustomUser.objects.get(id=user_id)
        response = {'username': user.username,
                    'email': user.email,
                    'userCollection': user.userCollections,
                    'logo': user.logo}
        return Response(response)

@api_view(['GET'])
def get_games(request):
    response_data = []
    for game in request.query_params.get('game_id'):
        try:
            output = GameInfo.objects.get(id=game)
            response_data.append({
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
            })
        except:
            pass
    return Response(response_data)