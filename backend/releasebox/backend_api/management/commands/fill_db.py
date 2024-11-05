from django.core.management.base import BaseCommand
import requests
from ...gameSerializer import GameSerializer, UnreleasedGamesSerializer


class Command(BaseCommand):
    help = 'Fill the database with data from API'

    def add_arguments(self, parser):
        parser.add_argument('model_name', type=str, help='Name of the model to save data to')

    def handle(self, *args, **kwargs):
        model_name = kwargs['model_name']
        if model_name.lower() == 'GameInfo'.lower():
            for i in range(1,2):
                url = 'https://api.rawg.io/api/games?key=d6c9714af1784481affffd3493eff327' +\
                      '&ordering=-metacritic&page_size=40&page=' + str(i)
                response = requests.get(url)
                data = response.json()
                games = data.get('results', [])
                for game in games:
                    item = {
                        'gameId': game.get('id'),
                        'name': game.get('name'),
                        'released': game.get('released'),
                        'platform': ', '.join([platform.get('platform').get('name') for platform in game.get('parent_platforms', [])]),
                        'genres': ', '.join([genre.get('name') for genre in game.get('genres', [])]),
                        'metacritic': game.get('metacritic'),
                        'imageBackground': game.get('background_image')
                    }
                    serializer = GameSerializer(data=item)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        self.stdout.write(self.style.ERROR(f'Error saving data: {serializer.errors}'))
            self.stdout.write(self.style.SUCCESS('Database' + str(model_name) + 'filled successfully!'))
        if model_name.lower() == 'UnreleasedGamesInfo'.lower():
            for i in range(1,2):
                url = 'https://api.rawg.io/api/games?key=d6c9714af1784481affffd3493eff327'+\
                      '&ordering=-rating&dates=2024-11-01,2024-12-01&page_size=40&page=' + str(i)
                response = requests.get(url)
                data = response.json()
                games = data.get('results', [])
                for game in games:
                    item = {
                        'gameId': game.get('id'),
                        'name': game.get('name'),
                        'releaseDate': game.get('released'),
                        'platform': ', '.join([platform.get('platform').get('name') for platform in game.get('parent_platforms', [])]),
                        'genres': ', '.join([genre.get('name') for genre in game.get('genres', [])]),
                        'imageBackground': game.get('background_image')
                    }
                    serializer = UnreleasedGamesSerializer(data=item)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        self.stdout.write(self.style.ERROR(f'Error saving data: {serializer.errors}'))
            self.stdout.write(self.style.SUCCESS('Database ' + str(model_name) + ' filled successfully!'))
