# Generated by Django 5.1.2 on 2024-12-06 10:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0003_alter_gameinfo_metacritic'),
    ]

    operations = [
        migrations.RenameField(
            model_name='unreleasedgamesinfo',
            old_name='releaseDate',
            new_name='released',
        ),
    ]
