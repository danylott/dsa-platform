from rest_framework.routers import DefaultRouter

from task_api.views import TaskViewSet

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="task")

urlpatterns = router.urls

app_name = "task-api"
