FROM --platform=linux/amd64 python:3.10.4-slim-buster

ENV PYTHONUNBUFFERED 1

WORKDIR app/

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN adduser \
    --disabled-password \
    --no-create-home \
    django-user

COPY --chown=django-user:django-user entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

RUN mkdir /data
RUN chown -R django-user:django-user /data
RUN chmod 775 /data
RUN chmod g+s /data


USER django-user


ENTRYPOINT ["/entrypoint"]
