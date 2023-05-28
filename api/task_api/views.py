from typing import Type

import requests
from django.contrib.auth import get_user_model
from django.db.models import QuerySet
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from core.models import (
    Task,
    TaskReaction,
    TaskSubmission,
    TaskTemplate,
    Topic,
    Language,
)

from .filters import TaskFilter
from .serializers import (
    TaskListSerializer,
    TaskDetailSerializer,
    TaskSubmissionListSerializer,
    TaskSubmissionDetailSerializer,
    TaskSubmissionCreateSerializer,
    TaskTemplateSerializer,
    TopicSerializer,
    LanguageSerializer,
)

User = get_user_model()


def toggle_task_reaction(
    user: User, task: Task, reaction: TaskReaction.ReactionChoices
) -> None:
    try:
        task_reaction = TaskReaction.objects.get(user=user, task=task)
        if task_reaction.reaction == reaction:
            task_reaction.delete()
        else:
            task_reaction.reaction = reaction
            task_reaction.save()
    except TaskReaction.DoesNotExist:
        TaskReaction.objects.create(user=user, task=task, reaction=reaction)


class TaskViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
):
    lookup_field = "slug"
    filterset_class = TaskFilter

    def get_queryset(self) -> QuerySet:
        queryset = Task.objects.all()

        return queryset

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_serializer_class(self) -> Type[Serializer]:
        if self.action in ("toggle_like", "toggle_dislike"):
            return Serializer

        if self.action == "list":
            return TaskListSerializer

        return TaskDetailSerializer

    @action(detail=True, methods=["POST"], url_path="toggle-like")
    def toggle_like(self, request: Request, slug: str = None) -> Response:
        task = self.get_object()
        toggle_task_reaction(request.user, task, TaskReaction.ReactionChoices.LIKE)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["POST"], url_path="toggle-dislike")
    def toggle_dislike(self, request: Request, slug: str = None) -> Response:
        task = self.get_object()
        toggle_task_reaction(request.user, task, TaskReaction.ReactionChoices.DISLIKE)
        return Response(status=status.HTTP_200_OK)


class TaskSubmissionViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
):
    def get_queryset(self) -> QuerySet:
        queryset = TaskSubmission.objects.filter(
            user=self.request.user,
            task__slug=self.kwargs["task_slug"],
        )

        return queryset

    def get_serializer_class(self) -> Type[Serializer]:
        if self.action == "create":
            return TaskSubmissionCreateSerializer

        return TaskSubmissionDetailSerializer

    def perform_create(
        self, serializer: TaskSubmissionCreateSerializer
    ) -> TaskSubmission:
        task = Task.objects.get(slug=self.kwargs["task_slug"])
        task_template = TaskTemplate.objects.get(
            task=task, language=serializer.validated_data["language"]
        )
        code = f"{serializer.validated_data['code']}\n{task_template.code_runner}"
        test_cases = [
            {"input": test_case.input, "output": test_case.output}
            for test_case in task.test_cases.all()
        ]
        # TODO: fix hardcode
        python_url = "https://28tz15mu48.execute-api.us-east-1.amazonaws.com/check_task"
        response = requests.post(
            python_url,
            json={"code": code, "test_cases": test_cases},
        )
        if response.status_code == 200:
            runtime = response.json()["runtime"]
            result_status = response.json()["status"]
            message = response.json()["message"]
        else:
            runtime = 5000
            result_status = TaskSubmission.StatusChoices.TIME_LIMIT_EXCEEDED
            message = f"Time Limit"

        return serializer.save(
            user=self.request.user,
            task=task,
            runtime=runtime,
            status=result_status,
            result_message=message,
        )


class TaskTemplateViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
):
    serializer_class = TaskTemplateSerializer

    def get_queryset(self) -> QuerySet:
        queryset = TaskTemplate.objects.filter(
            task__slug=self.kwargs["task_slug"],
        )

        return queryset


class TopicViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class LanguageViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
