from django.core.management.base import BaseCommand
from django.apps import apps

class Command(BaseCommand):
    help = 'Удаляет все данные из указанной модели'

    def add_arguments(self, parser):
        parser.add_argument('model_name', type=str, help='Имя модели, из которой нужно удалить данные')

    def handle(self, *args, **kwargs):
        model_name = kwargs['model_name']

        # Получаем модель по имени
        try:
            model = apps.get_model('backend_api', model_name)
        except LookupError:
            self.stdout.write(self.style.ERROR(f'Модель {model_name} не найдена.'))
            return

        # Удаляем все объекты в модели
        deleted_count, _ = model.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Удалено {deleted_count} записей из модели {model_name}.'))