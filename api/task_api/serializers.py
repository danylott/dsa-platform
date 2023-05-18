from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from core.models import Task, Topic, TaskSubmission, Language, TaskReaction


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ("name",)


class TaskListSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    acceptance_rate = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    difficulty = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ("slug", "name", "difficulty", "topics", "status", "acceptance_rate")

    def get_acceptance_rate(self, obj: Task) -> str | None:
        count_submissions = obj.submissions.count()
        count_accepted_submissions = obj.submissions.filter(
            status=TaskSubmission.StatusChoices.ACCEPTED
        ).count()

        if count_submissions == 0:
            return None

        return f"{(count_accepted_submissions / count_submissions) * 100:.1f}%"

    def get_status(self, obj: Task) -> str | None:
        count_submissions = obj.submissions.count()
        count_accepted_submissions = obj.submissions.filter(
            status=TaskSubmission.StatusChoices.ACCEPTED
        ).count()

        if count_submissions == 0:
            return None

        if count_accepted_submissions == 0:
            return "Attempted"

        return "Solved"

    def get_difficulty(self, obj: Task) -> str:
        return obj.get_difficulty_display()


class TaskDetailSerializer(TaskListSerializer):
    num_submissions = serializers.SerializerMethodField()
    num_accepted_submissions = serializers.SerializerMethodField()
    num_likes = serializers.SerializerMethodField()
    num_dislikes = serializers.SerializerMethodField()
    my_reaction = serializers.SerializerMethodField()
    code_language = serializers.SerializerMethodField()

    def get_num_submissions(self, obj: Task) -> int:
        return obj.submissions.count()

    def get_num_accepted_submissions(self, obj: Task) -> int:
        return obj.submissions.filter(
            status=TaskSubmission.StatusChoices.ACCEPTED
        ).count()

    def get_num_likes(self, obj: Task) -> int:
        return obj.reactions.filter(reaction=TaskReaction.ReactionChoices.LIKE).count()

    def get_num_dislikes(self, obj: Task) -> int:
        return obj.reactions.filter(
            reaction=TaskReaction.ReactionChoices.DISLIKE
        ).count()

    def get_my_reaction(self, obj: Task) -> str | None:
        user = self.context["request"].user

        try:
            task_reaction = obj.reactions.get(user=user)
        except ObjectDoesNotExist:
            return None

        return task_reaction.reaction

    def get_code_language(self, obj: Task) -> str:
        return obj.code_language.get_name_display()

    class Meta(TaskListSerializer.Meta):
        fields = TaskListSerializer.Meta.fields + (
            "description",
            "solution",
            "solution_code",
            "my_reaction",
            "code_language",
            "num_submissions",
            "num_accepted_submissions",
            "num_likes",
            "num_dislikes",
        )
