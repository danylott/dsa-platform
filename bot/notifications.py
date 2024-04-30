import os

import init_django_orm  # noqa: F401

import datetime
import requests
from requests import Response

import queries
from core.models import Task, BotSettings


TELEGRAM_BOT_TOKEN = os.getenv("BOT_TOKEN")
TELEGRAM_SEND_MESSAGE_URL = (
    f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
)
STATISTICS_MONDAY_TIME_HOUR = 10


def process_notifications() -> None:
    print("Process notifications")
    current_time = datetime.datetime.utcnow()

    for bot_setting in BotSettings.objects.all():
        if bot_setting.daily_reminder_time == current_time.hour:
            _process_daily_task_notifications(bot_setting)

        if (
            bot_setting.send_weekly_statistics
            and current_time.hour == STATISTICS_MONDAY_TIME_HOUR
            and current_time.weekday() == 0
        ):
            _process_weekly_statistics_notification(bot_setting)

        if bot_setting.subscriptions.count() > 0:
            _process_new_task_notifications_for_topics(bot_setting)


def _process_daily_task_notifications(bot_setting: BotSettings) -> None:
    random_not_started_task_for_user = queries.get_random_not_started_task_for_user(
        bot_setting.user
    )
    _send_daily_task_notification(bot_setting.chat_id, random_not_started_task_for_user)


def _send_daily_task_notification(chat_id: int, task: Task) -> None:
    _send_telegram_notification(
        "Hey, new day - new opportunity to learn algorithms. \n"
        "🎲 Today your random task for practice is: \n"
        f"ℹ️ {task.name}\n"
        f"💪 Difficulty level: {task.get_difficulty_display()}\n"
        f"🔗 Link to the task: \nhttp://localhost:3000/tasks/{task.id}/",
        chat_id,
    )


def _process_weekly_statistics_notification(bot_setting: BotSettings) -> None:
    statistics = queries.get_weekly_statistics(bot_setting.user)

    _send_telegram_notification(
        "Hey, here is your statistics for previous week :)\n"
        + format_statistics_message(statistics),
        bot_setting.chat_id,
    )


def format_statistics_message(statistics: dict) -> str:
    return (
        f"🐣 Easy: {statistics['easy']}\n"
        f"🐰 Medium: {statistics['medium']}\n"
        f"🐍 Hard: {statistics['hard']}\n"
        f"Keep up the good work!"
    )


def _process_new_task_notifications_for_topics(bot_setting: BotSettings) -> None:
    newly_created_tasks = queries.get_newly_created_tasks_by_topics(
        bot_setting.subscriptions.all()
    )

    for new_task in newly_created_tasks:
        _send_telegram_notification(
            "New task with topic you interested in was added: \n"
            f"ℹ️ {new_task.name}\n"
            f"💪 Difficulty level: {new_task.get_difficulty_display()}\n"
            f"🚩 Topics: {','.join(new_task.topics.values_list('name', flat=True))}\n"
            f"🔗 Link to the task: \nhttp://localhost:3000/tasks/{new_task.id}/",
            bot_setting.chat_id,
        )


def _send_telegram_notification(message: str, chat_id: int) -> Response:
    return requests.post(
        TELEGRAM_SEND_MESSAGE_URL,
        data={
            "chat_id": chat_id,
            "text": message,
        },
    )
