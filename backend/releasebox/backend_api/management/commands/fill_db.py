from django.core.management.base import BaseCommand
import requests
from ...gameSerializer import GameSerializer, UnreleasedGamesSerializer


class Command(BaseCommand):
    help = 'Fill the database with data from API'

    def add_arguments(self, parser):
        parser.add_argument('model_name', type=str, help='Name of the model to save data to')

    def handle(self, *args, **kwargs):
        model_name = kwargs['model_name']
        restricted_tags = ['NSFW', 'hentai', 'Sexual Content', 'Секс', 'Хентай']
        if model_name.lower() == 'GameInfo'.lower():
            url = 'https://api.rawg.io/api/games?key=d6c9714af1784481affffd3493eff327' + \
                  '&ordering=-metacritic&page_size=40&page=1'
            for i in range(1, 2):
                if url == 'null':
                    break
            # While url != 'null'
                response = requests.get(url)
                data = response.json()
                url = data.get('next')
                games = data.get('results', [])
                for game in games:
                    if not any(restricted_tag in
                               (tag.get('name') for tag in game.get('tags', []))
                               for restricted_tag in restricted_tags):
                        item = {
                            'gameId': game.get('id'),
                            'name': game.get('name'),
                            'released': game.get('released'),
                            'rating': game.get('rating'),
                            'platform': ', '.join([platform.get('platform').get('name') for platform in game.get('parent_platforms', [])]),
                            'genres': ', '.join([genre.get('name') for genre in game.get('genres', [])]),
                            'stores': ', '.join([store.get("store").get('name') for store in game.get('stores', [])]),
                            'esrb_rating': game.get('esrb_rating', {}).get('name') if game.get('esrb_rating') else 'null',
                            'tags': ', '.join([tag.get('name') for tag in game.get('tags', [])]),
                            'short_screenshots': ', '.join([screen.get('image') for screen in game.get('short_screenshots', [])]),
                            'metacritic': game.get('metacritic'),
                            'imageBackground': game.get('background_image') if game.get('background_image') else 'null',
                        }
                        serializer = GameSerializer(data=item)
                        if serializer.is_valid():
                            serializer.save()
                        else:
                            self.stdout.write(self.style.ERROR(f'Error saving data: {serializer.errors}'))
            self.stdout.write(self.style.SUCCESS('Database ' + str(model_name) + ' filled successfully!'))
        if model_name.lower() == 'UnreleasedGamesInfo'.lower():
            url = 'https://api.rawg.io/api/games?key=d6c9714af1784481affffd3493eff327' + \
                  '&dates=2024-11-01,2024-12-01&page_size=40&page=' + str(1)
            # Изменить url при конечном заполнении
            for i in range(1, 3):
                if url == 'null':
                    break
            # While url != 'null'
                response = requests.get(url)
                data = response.json()
                url = data.get('next')
                games = data.get('results', [])
                for game in games:
                    if not any(restricted_tag in
                               (tag.get('name') for tag in game.get('tags', []))
                               for restricted_tag in restricted_tags):
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
