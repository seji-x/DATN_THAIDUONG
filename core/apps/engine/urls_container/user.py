from django.urls import path, include
from rest_framework import routers

from core.apps.engine.views_container.user import UserViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('user', UserViewSet)

urlpatterns = [
    path("", include(router.urls))
]
