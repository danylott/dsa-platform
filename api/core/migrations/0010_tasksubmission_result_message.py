# Generated by Django 4.2.1 on 2023-05-19 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0009_alter_tasktemplate_code_runner"),
    ]

    operations = [
        migrations.AddField(
            model_name="tasksubmission",
            name="result_message",
            field=models.TextField(blank=True, null=True),
        ),
    ]