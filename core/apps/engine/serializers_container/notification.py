from django.db.models import Avg
from rest_framework import serializers

from core.apps.engine.models_container import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        extra_kwargs = {
            "id": {
                "read_only": True
            },
            "sender": {
                "read_only": True
            }
        }

    def create(self, validated_data):
        data = validated_data.pop('data', {})
        notification = Notification.objects.create(sender=self.context['request'].user, data=data, **validated_data)
        return notification
