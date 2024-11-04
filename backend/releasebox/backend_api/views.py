from rest_framework.views import APIView
from rest_framework.response import Response
from .models import GameInfo
from .serializer import GameSerializer


class GameInfoView(APIView):
    def get(self, request):
        output = [
            {
                'id': output.id,
                'name': output.name,
                'released': output.released,
                'platform': output.platform,
                'genres': output.genre,
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