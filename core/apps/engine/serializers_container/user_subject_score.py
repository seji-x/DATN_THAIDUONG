from django.db.models import Avg
from rest_framework import serializers

from core.apps.engine.models_container import UserSubjectScore


class UserSubjectScoreSerializer(serializers.ModelSerializer):
    statistic = serializers.SerializerMethodField()

    class Meta:
        model = UserSubjectScore
        fields = '__all__'
        extra_kwargs = {
            "id": {
                "read_only": True
            }
        }
