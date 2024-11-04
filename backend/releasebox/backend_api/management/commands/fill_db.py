from django.core.management.base import BaseCommand
import requests
from ...serializer import GameSerializer


class Command(BaseCommand):
    help = 'Fill the database with data from API'

    def handle(self, *args, **kwargs):
        for i in range(1,2):
            url = 'https://api.rawg.io/api/games?key=d6c9714af1784481affffd3493eff327&ordering=-metacritic&page_size=40&page=' + str(i)
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

        self.stdout.write(self.style.SUCCESS('Database filled successfully!'))