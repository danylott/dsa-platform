from typing import Type

from django.db.models import QuerySet
from rest_framework import viewsets, mixins
from rest_framework.serializers import Serializer

from core.models import Task
from .serializers import TaskListSerializer, TaskDetailSerializer


class TaskViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
):
    lookup_field = "slug"

    def get_queryset(self) -> QuerySet:
        queryset = Task.objects.all()

        return queryset

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_serializer_class(self) -> Type[Serializer]:
        if self.action == "list":
            return TaskListSerializer

        return TaskDetailSerializer
