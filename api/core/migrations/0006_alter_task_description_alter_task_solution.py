# Generated by Django 4.2.1 on 2023-05-18 15:41

from django.db import migrations
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_alter_task_description_alter_task_solution"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="description",
            field=markdownx.models.MarkdownxField(),
        ),
        migrations.AlterField(
            model_name="task",
            name="solution",
            field=markdownx.models.MarkdownxField(),
        ),
    ]
