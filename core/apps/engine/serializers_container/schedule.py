from django.db.models import Avg
from rest_framework import serializers

from core.apps.engine.models_container import User
from core.apps.engine.models_container.enum_type import RoleUserEnum
from core.apps.engine.models_container.models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        extra_kwargs = {
            "id": {
                "read_only": True
            }
        }

    def create(self, validated_data):
        teacher = validated_data.pop('teacher_id', None)
        student = validated_data.pop('student_id', None)

        if teacher.role != RoleUserEnum.TEACHER :
            raise serializers.ValidationError({"teacher_id": "User must be a teacher."})
        if student.role != RoleUserEnum.STUDENT:
            raise serializers.ValidationError({"student_id": "User must be a student."})
        schedule = Schedule.objects.create(teacher_id=teacher, student_id=student, **validated_data)
        return schedule
