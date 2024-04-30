# Generated by Django 4.2.1 on 2024-04-14 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0012_botsettings"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="botsettings",
            options={"verbose_name_plural": "Bot settings"},
        ),
        migrations.AddField(
            model_name="botsettings",
            name="send_weekly_statistics",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="botsettings",
            name="subscriptions",
            field=models.ManyToManyField(blank=True, to="core.topic"),
        ),
    ]
