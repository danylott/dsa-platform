import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, types
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

import queries
from notifications import format_statistics_message

TOKEN = getenv("BOT_TOKEN")
CONNECT_DSA_PLATFORM_LINK = "http://localhost:3000/telegram/{chat_id}"

dp = Dispatcher()


class MenuStates(StatesGroup):
    choose_option = State()


menu_keyboard = ReplyKeyboardMarkup(
    resize_keyboard=True,
    one_time_keyboard=False,
    keyboard=[
        [
            KeyboardButton(text="Setup Daily reminders"),
            KeyboardButton(text="Toggle weekly statistics notifications"),
        ],
        [
            KeyboardButton(text="Show my current tasks statistics"),
            KeyboardButton(text="Subscribe to topics"),
        ],
    ],
)


def format_time(time: int):
    return f"{'0' if time <= 9 else ''}{time}:00"


daily_reminder_keyboard = ReplyKeyboardMarkup(
    resize_keyboard=True,
    one_time_keyboard=True,
    keyboard=[[KeyboardButton(text=f"Remind at {format_time(i)}")] for i in range(24)]
    + [[KeyboardButton(text="Back")]],
)


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await queries.create_bot_settings_if_not_exist(message.chat.id)
    await message.answer(
        "👋 Hi! Welcome to Data Structures & Algorithms Bot. ⚛️\n"
        "Here you'll be able to setup reminders & subscribe to the topics you like. \n"
        "As well as review statistics of your current progress with coding!\n"
        "Use 'Menu' to setup your settings."
    )
    await message.answer(
        "Before proceeding to next steps, please, connect your telegram account to your DSA platform account.\n"
        "Just open this link after you logged-in on the DSA platform: \n",
    )
    await message.answer(
        f"🔗 {CONNECT_DSA_PLATFORM_LINK.format(chat_id=message.chat.id)}",
        reply_markup=menu_keyboard,
    )


# @dp.message(commands="menu")
# async def menu_handler(message: types.Message):
#     await message.answer(
#         chat_id=message.chat.id,
#         text="Here is the menu. Please choose an option:",
#         reply_markup=menu_keyboard,
#     )


def create_choose_topic_to_subscribe_menu(
    all_topics: list[str], subscribed_topics: set[str]
):
    return ReplyKeyboardMarkup(
        resize_keyboard=True,
        one_time_keyboard=True,
        keyboard=[
            [
                KeyboardButton(
                    text=f"Topic name: {topic}"
                    + (" (unsubscribe)" if topic in subscribed_topics else "")
                )
            ]
            for topic in all_topics
        ]
        + [[KeyboardButton(text="Back")]],
    )


@dp.message()
async def process_menu_choice(message: types.Message):
    choice = message.text

    if choice == "Back":
        await message.answer("Returning to main menu...", reply_markup=menu_keyboard)

    elif choice.startswith("Remind at "):
        time = int(choice[10:12])
        await queries.update_daily_reminder_time(chat_id=message.chat.id, time=time)
        await message.answer(
            f"✅ Successfully set up daily task reminder at {format_time(time)}.\n"
            f"Now you'll receive reminder every day about studying algorithms!",
            reply_markup=menu_keyboard,
        )

    elif choice.startswith("Topic name:"):
        topic_name = choice[12:]
        is_unsubscribe = "unsubscribe" in choice
        text = "✅ Subscriptions updated successfully!"

        if is_unsubscribe:
            topic_name = topic_name[:-14]
            await queries.unsubscribe_from_topic(
                chat_id=message.chat.id, topic_name=topic_name
            )
        else:
            await queries.subscribe_to_topic(
                chat_id=message.chat.id, topic_name=topic_name
            )

        await message.answer(
            text,
            reply_markup=create_choose_topic_to_subscribe_menu(
                await queries.get_all_topics(),
                set(await queries.get_subscribed_topics(chat_id=message.chat.id)),
            ),
        )

    elif choice == "Setup Daily reminders":
        await message.reply(
            "Setting up daily task reminders...", reply_markup=daily_reminder_keyboard
        )

    elif choice == "Toggle weekly statistics notifications":
        await queries.turn_on_weekly_statistics(chat_id=message.chat.id)
        await message.reply(
            "🏆 Now we'll send you weekly statistics on Monday's about your progress on completed tasks!",
            reply_markup=menu_keyboard,
        )

    elif choice == "Show my current tasks statistics":
        statistics = await queries.get_tasks_statistics(chat_id=message.chat.id)
        await message.reply(
            "🏆 \nYour full stats:\n" + format_statistics_message(statistics),
            reply_markup=menu_keyboard,
        )

    elif choice == "Subscribe to topics":
        await message.reply(
            "Subscribing to topics...",
            reply_markup=create_choose_topic_to_subscribe_menu(
                await queries.get_all_topics(),
                set(await queries.get_subscribed_topics(chat_id=message.chat.id)),
            ),
        )
    else:
        try:
            await message.reply(
                "Sorry, this bot doesn't support direct communicating with it - use 'Menu' to setup your settings.",
                reply_markup=menu_keyboard,
            )
        except TypeError:
            await message.reply(
                "Sorry, this bot doesn't support direct communicating with it - use 'Menu' to setup your settings.",
                reply_markup=menu_keyboard,
            )


async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
