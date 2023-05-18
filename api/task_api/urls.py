from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from task_api.views import (
    TaskViewSet,
    TaskSubmissionViewSet,
    TaskTemplateViewSet,
    TopicViewSet,
    LanguageViewSet,
)

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="task")
router.register("topics", TopicViewSet, basename="topic")
router.register("languages", LanguageViewSet, basename="language")

tasks_router = routers.NestedSimpleRouter(router, "tasks", lookup="task")
tasks_router.register("submissions", TaskSubmissionViewSet, basename="task-submission")
tasks_router.register("templates", TaskTemplateViewSet, basename="task-template")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(tasks_router.urls)),
]

app_name = "task-api"
