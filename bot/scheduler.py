import init_django_orm  # noqa: F401
import schedule
import time
import datetime

from notifications import process_notifications


schedule.every().second.do(process_notifications)

while True:
    print(f"check: {datetime.datetime.utcnow()}")
    schedule.run_pending()
    time.sleep(1)  # wait one minute
