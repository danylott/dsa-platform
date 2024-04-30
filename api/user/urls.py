from django.urls import path, re_path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from user.views import EmailObtainPairView, connect_telegram_bot_to_user


urlpatterns = [
    path("", include("djoser.urls")),
    re_path(r"^jwt/create/?", EmailObtainPairView.as_view(), name="jwt-create"),
    re_path(r"^jwt/refresh/?", TokenRefreshView.as_view(), name="jwt-refresh"),
    re_path(r"^jwt/verify/?", TokenVerifyView.as_view(), name="jwt-verify"),
    path(
        "users/telegram/<int:chat_id>/",
        connect_telegram_bot_to_user,
        name="connect-telegram-bot",
    ),
]

app_name = "user"
