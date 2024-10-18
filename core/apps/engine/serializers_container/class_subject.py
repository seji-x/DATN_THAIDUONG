from django.db.models import Avg
from rest_framework import serializers

from core.apps.engine.models_container.models import ClassSubject


class ClassSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSubject
        fields = '__all__'
        extra_kwargs = {
            "id": {
                "read_only": True
            }
        }
