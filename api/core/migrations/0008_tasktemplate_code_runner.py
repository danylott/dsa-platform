# Generated by Django 4.2.1 on 2023-05-19 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_tasktestcase"),
    ]

    operations = [
        migrations.AddField(
            model_name="tasktemplate",
            name="code_runner",
            field=models.TextField(blank=True, null=True),
        ),
    ]
