from django.contrib import admin
from django.db import models
from django_ace import AceWidget
from markdownx.admin import MarkdownxModelAdmin
from .models import Task, TaskTemplate, TaskReaction, Language, Topic, TaskSubmission


# TODO: add django-jazzmin for better admin page interface


@admin.register(Task)
class TaskAdmin(MarkdownxModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AceWidget(mode="python", theme="monokai")},
    }


@admin.register(TaskTemplate)
class TaskTemplateAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AceWidget(mode="text", theme="monokai")},
    }


@admin.register(TaskReaction)
class TaskReactionAdmin(admin.ModelAdmin):
    pass


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    pass


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass


@admin.register(TaskSubmission)
class TaskSubmissionAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AceWidget(mode="text", theme="monokai")},
    }
