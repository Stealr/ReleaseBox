from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from backend_api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('games/', GameInfoView.as_view()),
    path('games/<int:id>/', getGame),
    path('games/filtration', filtration),
    path('games/sorting/', sorting),
    path('unreleasedGames/', UnreleasedGameInfoView.as_view()),
    path('unreleasedGames/<int:id>/', getGame),
    path('', include('backend_api.urls')),
    path('register/', RegisterView.as_view()),
    path('login/', CustomTokenObtainPairView.as_view()),
    path('games/addToCollection/', addToCollection)
    ]
