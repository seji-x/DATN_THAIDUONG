from rest_framework import viewsets, permissions
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.apps.engine.models_container.models import Schedule
from core.apps.engine.serializers_container.schedule import ScheduleSerializer


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
