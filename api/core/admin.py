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
    BotSettings,
)


class TaskAdminForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = "__all__"
        widgets = {
            "solution_code": AceWidget(mode="python", theme="xcode"),
        }


class TaskTestCaseInline(admin.TabularInline):
    formfield_overrides = {
        models.TextField: {
            "widget": AceWidget(mode="text", theme="xcode", height="80px")
        },
    }
    model = TaskTestCase
    extra = 1


class TaskTemplatesInline(admin.TabularInline):
    formfield_overrides = {
        models.TextField: {
            "widget": AceWidget(mode="python", theme="xcode", height="80px")
        },
    }
    model = TaskTemplate
    extra = 1


@admin.register(Task)
class TaskAdmin(MarkdownxModelAdmin):
    form = TaskAdminForm
    filter_horizontal = ("topics",)
    inlines = (TaskTestCaseInline, TaskTemplatesInline)


@admin.register(TaskTemplate)
class TaskTemplateAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {"widget": AceWidget(mode="python", theme="xcode")},
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
    list_display = ["task", "user", "status"]
    formfield_overrides = {
        models.TextField: {"widget": AceWidget(mode="python", theme="xcode")},
    }


@admin.register(TaskTestCase)
class TaskTestCaseAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {
            "widget": AceWidget(mode="text", theme="xcode", height="80px")
        },
    }


@admin.register(BotSettings)
class BotSettingsAdmin(admin.ModelAdmin):
    pass
