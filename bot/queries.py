import datetime
import random

from asgiref.sync import sync_to_async

import init_django_orm  # noqa: F401

from django.db.models import Sum, Q, Count, QuerySet

from core.models import BotSettings, Task, TaskSubmission, Topic
from user.models import User


async def create_bot_settings_if_not_exist(chat_id: int) -> None:
    await BotSettings.objects.aget_or_create(chat_id=chat_id)


def get_random_not_started_task_for_user(user: User) -> Task:
    not_start_tasks_ids = (
        Task.objects.annotate(
            num_submissions=Sum("submissions", filter=Q(submissions__user=user))
        )
        .filter(num_submissions=0)
        .values_list("id")
    )

    if len(not_start_tasks_ids) == 0:
        return Task.objects.first()

    task_id = random.choice(not_start_tasks_ids)
    return Task.objects.get(task_id)


def get_statistics(queryset: QuerySet[Task]) -> dict:
    task_queryset = queryset.filter(
        submissions__status=TaskSubmission.StatusChoices.ACCEPTED,
    ).distinct()

    print(task_queryset)

    statistics = {
        "easy": 0,
        "medium": 0,
        "hard": 0,
    }

    for task in task_queryset:
        statistics[task.get_difficulty_display().lower()] += 1

    return statistics


def get_weekly_statistics(user: User) -> dict:
    return get_statistics(
        Task.objects.filter(
            submissions__user=user,
            submissions__created_at__lt=datetime.datetime.utcnow(),
            submissions__created_at__gte=(
                datetime.datetime.utcnow() - datetime.timedelta(days=7)
            ),
        )
    )


def sync_get_task_statistics(chat_id: int) -> dict:
    user = BotSettings.objects.get(chat_id=chat_id).user
    return get_statistics(Task.objects.filter(submissions__user=user))


async def get_tasks_statistics(chat_id: int) -> dict:
    return await sync_to_async(sync_get_task_statistics)(chat_id)


def get_newly_created_tasks_by_topics(topics: QuerySet[Topic]) -> QuerySet[Task]:
    return Task.objects.filter(
        topics__in=topics,
        # created_at__lt=datetime.datetime.utcnow(),
        # created_at__gte=datetime.datetime.utcnow() - datetime.timedelta(hours=1),
    )


async def get_all_topics() -> list[str]:
    return [topic.name async for topic in Topic.objects.all()]


async def get_subscribed_topics(chat_id: int) -> list[str]:
    bot_settings = await BotSettings.objects.aget(chat_id=chat_id)
    return [topic.name async for topic in bot_settings.subscriptions.all()]


async def update_daily_reminder_time(chat_id: int, time: int):
    bot_settings = await BotSettings.objects.aget(chat_id=chat_id)
    bot_settings.daily_reminder_time = time
    await bot_settings.asave()


async def turn_on_weekly_statistics(chat_id: int):
    bot_settings = await BotSettings.objects.aget(chat_id=chat_id)
    bot_settings.send_weekly_statistics = True
    await bot_settings.asave()


async def subscribe_to_topic(chat_id: int, topic_name: str):
    bot_settings = await BotSettings.objects.aget(chat_id=chat_id)
    topic = await Topic.objects.aget(name=topic_name)
    await bot_settings.subscriptions.aadd(topic)


async def unsubscribe_from_topic(chat_id: int, topic_name: str):
    bot_settings = await BotSettings.objects.aget(chat_id=chat_id)
    topic = await Topic.objects.aget(name=topic_name)
    await bot_settings.subscriptions.aremove(topic)
