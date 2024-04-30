from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from core.models import BotSettings
from user.serializers import EmailObtainPairSerializer


class EmailObtainPairView(TokenObtainPairView):
    serializer_class = EmailObtainPairSerializer


@api_view(["GET"])
def connect_telegram_bot_to_user(request: Request, chat_id: int) -> Response:
    bot = BotSettings.objects.get(chat_id=chat_id)

    if request.method == "GET":
        bot.user = request.user
        bot.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
