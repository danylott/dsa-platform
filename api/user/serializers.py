from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_staff",
        )
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True, "min_length": 8}}

    def create(self, validated_data: dict) -> settings.AUTH_USER_MODEL:
        return get_user_model().objects.create_user(**validated_data)

    def update(
        self, instance: settings.AUTH_USER_MODEL, validated_data: dict
    ) -> settings.AUTH_USER_MODEL:
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class EmailObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: settings.AUTH_USER_MODEL) -> Token:
        token = super().get_token(user)

        token["email"] = user.email

        return token
