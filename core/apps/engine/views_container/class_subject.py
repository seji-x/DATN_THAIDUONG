from rest_framework import viewsets, permissions
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.apps.engine.models_container.models import ClassSubject
from core.apps.engine.serializers_container.class_subject import ClassSubjectSerializer


class ClassSubjectViewSet(viewsets.ModelViewSet):
    queryset = ClassSubject.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = ClassSubjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
