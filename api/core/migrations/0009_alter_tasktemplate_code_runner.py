# Generated by Django 4.2.1 on 2023-05-19 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0008_tasktemplate_code_runner"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tasktemplate",
            name="code_runner",
            field=models.TextField(),
        ),
    ]
