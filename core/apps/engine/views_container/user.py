from django.db.models import Q
from rest_framework import viewsets, mixins, status, generics
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from core.apps.engine.models_container.enum_type import RoleUserEnum
from core.apps.engine.serializers import (
    UserSerializer,
    UserSerializers,
    UserLogoutSerializer,
    UpdateUserSerializer,
    UserRegisterSerializer,
    UserDeleteAccountSerializer,
)
from core.apps.engine.serializers_container.token import CustomTokenObtainPairSerializer
from core.apps.engine.serializers_container.user import GetUserSerializer, UserInfoSerializers
from core.apps.engine.views_container import (
    User, action, openapi, timezone, Response, AppStatus,
    permissions, RefreshToken, GenericAPIView,
    swagger_auto_schema, )


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterViewSet(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    parser_classes = (MultiPartParser, FormParser)


class VerifyCodeViewSet(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    @swagger_auto_schema(request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT, properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'verify_code': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['email', 'verify_code']),
    )
    def post(self, request):
        email = request.data['email']
        verify_code = request.data['verify_code']
        user = User.objects.filter(email=email).first()
        if user:
            if user.verify_code == verify_code:
                if user.code_lifetime >= timezone.now():
                    user.is_active = True
                    user.save()
                    refresh = RefreshToken.for_user(user)
                    data = {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    }
                    return Response(data)
                return Response(AppStatus.EXPIRED_VERIFY_CODE.message)
            else:
                return Response(AppStatus.INVALID_VERIFY_CODE.message)
        else:
            return Response(AppStatus.EMAIL_NOT_EXIST.message)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = UserInfoSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role', None)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(Q(full_name__icontains=search) | Q(email__icontains=search))
        if role:
            queryset = queryset.filter(role=role)
        return queryset

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('role', openapi.IN_QUERY, description="Role of the user (e.g. ADMIN, TEACHER, STUDENT)",
                              type=openapi.TYPE_STRING, required=False, enum=[role.value for role in RoleUserEnum]),
            openapi.Parameter('search', openapi.IN_QUERY, description="search of the user", type=openapi.TYPE_STRING,
                              required=False),
        ],
        responses={200: GetUserSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_count': queryset.count(),
            'results': serializer.data,
        })

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='get_me/')
    def get_me(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class UserLogOutViewSet(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserLogoutSerializer

    def get(self, *args, **kwargs):
        user = self.request.user
        user.device_token = None
        user.save()
        return Response(AppStatus.USER_LOGOUT_SUCCESS.message)
