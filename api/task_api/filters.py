from django_filters import rest_framework as filters

from core.models import Task


class TaskFilter(filters.FilterSet):
    class Meta:
        model = Task
        fields = ("difficulty", "topics")  # TODO: add status & name filter
