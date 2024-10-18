from django.db.models import Avg
from rest_framework import serializers

from core.apps.engine.models_container import Class


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'key', 'year']
        extra_kwargs = {
            "id": {
                "read_only": True
            }
        }
