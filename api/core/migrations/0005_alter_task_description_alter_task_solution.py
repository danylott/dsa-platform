# Generated by Django 4.2.1 on 2023-05-18 15:31

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_task_topics_alter_taskreaction_task_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="description",
            field=tinymce.models.HTMLField(),
        ),
        migrations.AlterField(
            model_name="task",
            name="solution",
            field=tinymce.models.HTMLField(),
        ),
    ]
