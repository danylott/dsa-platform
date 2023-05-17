from django.urls import path, re_path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from user.views import (
    EmailObtainPairView,
)


urlpatterns = [
    path("", include("djoser.urls")),
    re_path(r"^jwt/create/?", EmailObtainPairView.as_view(), name="jwt-create"),
    re_path(r"^jwt/refresh/?", TokenRefreshView.as_view(), name="jwt-refresh"),
    re_path(r"^jwt/verify/?", TokenVerifyView.as_view(), name="jwt-verify"),
]

app_name = "user"
