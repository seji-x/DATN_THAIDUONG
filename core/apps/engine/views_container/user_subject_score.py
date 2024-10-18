from rest_framework import viewsets, permissions
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.apps.engine.models_container import UserSubjectScore
from core.apps.engine.serializers_container.user_subject_score import UserSubjectScoreSerializer


class UserSubjectScoreViewSet(viewsets.ModelViewSet):
    queryset = UserSubjectScore.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = UserSubjectScoreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
