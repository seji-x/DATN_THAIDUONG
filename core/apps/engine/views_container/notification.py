from rest_framework import viewsets, permissions
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.apps.engine.models_container import Notification
from core.apps.engine.serializers_container.notification import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
