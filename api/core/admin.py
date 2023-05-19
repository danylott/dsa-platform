from django.contrib import admin
from django.db import models
from django import forms
from django_ace import AceWidget
from markdownx.admin import MarkdownxModelAdmin
from .models import (
    Task,
    TaskTemplate,
    TaskReaction,
    Language,
    Topic,
    TaskSubmission,
    TaskTestCase,
)


# TODO: add django-jazzmin for better admin page interface


class TaskAdminForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = "__all__"
        widgets = {
            "solution_code": AceWidget(mode="python", theme="monokai"),
        }


class TaskTestCaseInline(admin.TabularInline):
    formfield_overrides = {
        models.TextField: {
            "widget": AceWidget(mode="text", theme="monokai", height="80px")
        },
    }
    model = TaskTestCase
    extra = 1


@admin.register(Task)
class TaskAdmin(MarkdownxModelAdmin):
    form = TaskAdminForm
    filter_horizontal = ("topics",)
    inlines = (TaskTestCaseInline,)


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


@admin.register(TaskTestCase)
class TaskTestCaseAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {
            "widget": AceWidget(mode="text", theme="monokai", height="80px")
        },
    }
