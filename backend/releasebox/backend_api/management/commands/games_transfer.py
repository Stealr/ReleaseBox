from django.core.management.base import BaseCommand
from ...models import UnreleasedGamesInfo, GameInfo
from datetime import datetime, timedelta
from django.utils import timezone
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'Transfer unreleased games to released games'

    def handle(self, *args, **kwargs):
        today = self.get_today()
        released_games = GameInfo.objects.count()
        unreleased_games = UnreleasedGamesInfo.objects.filter(released__lt=today)

        for game in unreleased_games:
            GameInfo.objects.get_or_create(
                gameId=game.gameId,
                defaults={
                    'name': game.name,
                    'released': game.released,
                    'platform': game.platform or 'No data',
                    'genres': game.genres or 'No data',
                    'imageBackground': game.imageBackground or 'No data',
                    'rating': 'No data',
                    'stores': 'No data',
                    'metacritic': 'No data',
                    'esrb_rating': 'No data',
                    'tags': 'No data',
                    'short_screenshots': 'No data'
                }
            )
        self.stdout.write(self.style.SUCCESS(f'Transferred {GameInfo.objects.count() - released_games} games.'))

    def get_today(self):
        today = timezone.now()
        return today
