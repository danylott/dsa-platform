from rest_framework_simplejwt.views import TokenObtainPairView

from user.serializers import EmailObtainPairSerializer


class EmailObtainPairView(TokenObtainPairView):
    serializer_class = EmailObtainPairSerializer
