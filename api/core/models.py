from django.conf import settings
from django.db import models
from markdownx.models import MarkdownxField


class TimeStampAbstract(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Topic(TimeStampAbstract):
    name = models.CharField(max_length=63, unique=True)

    def __str__(self) -> str:
        return self.name


class Language(TimeStampAbstract):
    class LanguageChoices(models.TextChoices):
        PYTHON = "PYTHON", "Python"
        JS = "JS", "JavaScript"

    name = models.CharField(max_length=63, choices=LanguageChoices.choices, unique=True)


class Task(TimeStampAbstract):
    class TaskDifficulty(models.IntegerChoices):
        EASY = 1, "Easy"
        MEDIUM = 2, "Medium"
        HARD = 3, "Hard"

    name = models.CharField(max_length=127, unique=True)
    description = MarkdownxField()
    solution = MarkdownxField()
    solution_code = models.TextField()  # TODO: add django-ace
    code_language = models.ForeignKey(Language, on_delete=models.CASCADE)
    difficulty = models.IntegerField(choices=TaskDifficulty.choices)

    def __str__(self) -> str:
        return self.name


class TaskTemplate(TimeStampAbstract):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    code_template = models.TextField()  # TODO: add django-ace

    class Meta:
        unique_together = ("task", "language")

    def __str__(self) -> str:
        return f"{self.task.name} - {self.language.name}"


class TaskReaction(TimeStampAbstract):
    class ReactionChoices(models.TextChoices):
        LIKE = "LIKE", "Like"
        DISLIKE = "DISLIKE", "Dislike"

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reaction = models.CharField(max_length=63, choices=ReactionChoices.choices)

    class Meta:
        unique_together = ("task", "user")

    def __str__(self) -> str:
        return f"{self.task.name} - {self.user.email} - {self.reaction}"


class TaskSubmission(TimeStampAbstract):
    class StatusChoices(models.TextChoices):
        ACCEPTED = "ACCEPTED", "Accepted"
        ERROR = "ERROR", "Error"
        WRONG_ANSWER = "WRONG_ANSWER", "Wrong answer"
        TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED", "Time limit exceeded"

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=63, choices=StatusChoices.choices)
    code = models.TextField()  # TODO: add django-ace
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    runtime = models.IntegerField(db_comment="Runtime in ms")

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.task.name} - {self.user.email} - {self.status}"
