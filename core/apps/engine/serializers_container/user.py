import unicodedata
import random
from datetime import datetime

from rest_framework_simplejwt.views import TokenObtainPairView

from core.apps.engine.models import User
from django.contrib.auth.hashers import make_password

from core.apps.engine.models_container import Class, UserClass
from core.apps.engine.serializers_container import (serializers, AppStatus)
from core.apps.engine.serializers_container.user_class import UserClassSerializer


class UserRegisterSerializer(serializers.ModelSerializer):
    class_id = serializers.CharField(write_only=True, required=False)
    user_class = UserClassSerializer(read_only=True, required=False)
    avatar = serializers.ImageField(required=False, allow_null=True)
    code = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'username', 'email', 'address', 'phone_number', 'gender', 'date_of_birth', 'class_id',
                  'user_class', 'role', 'avatar', 'code']

    def remove_accents(self, text):
        text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8')
        return str(text)

    def generate_password(self, full_name, date_of_birth):
        clean_name = self.remove_accents(full_name).replace(' ', '').lower()
        dob_str = date_of_birth.strftime('%d%m%Y')
        return f"{clean_name}{dob_str}"

    def generate_code(self):
        current_year = datetime.now().year
        while True:
            random_digits = random.randint(10000000, 99999999)
            code = f"{current_year}{random_digits}"
            if not User.objects.filter(code=code).exists():
                break
        return code

    def create(self, validated_data):
        class_id = validated_data.pop('class_id', None)
        user = User.objects.filter(email=validated_data["email"]).first()
        if user and user.is_active:
            raise serializers.ValidationError("Email already exists.")

        full_name = validated_data.get('full_name')
        date_of_birth = validated_data.get('date_of_birth')
        generated_password = self.generate_password(full_name, date_of_birth)

        code = self.generate_code()
        validated_data['code'] = code

        hashed_password = make_password(generated_password)
        user_instance = super().create({**validated_data, 'password': hashed_password})

        if class_id:
            class_instance = Class.objects.filter(id=class_id).first()
            if not class_instance:
                raise serializers.ValidationError("Class with this name does not exist.")
            user_class_instance = UserClass.objects.create(user=user_instance, class_instance=class_instance)
            user_instance.user_class = user_class_instance

        return user_instance


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}, 'verify_code': {'write_only': True}}


class UserInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "role", "email", "full_name", "username", "phone_number", "code", "avatar",
                  "gender", "date_of_birth", "address", "date_joined"]


class GetUserSerializer(serializers.ModelSerializer):
    # user_class = UserClassSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "role", "email", "full_name", "username", "phone_number", "code", "avatar",
                  "gender", "date_of_birth", "address", "date_joined"]

    def validate_role(self, value):
        if value not in [choice[0] for choice in RoleUserEnum.choices()]:
            raise serializers.ValidationError("Invalid role provided.")
        return value


class UserDeleteAccountSerializer(serializers.Serializer):
    current_password = serializers.CharField(min_length=8)


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'phone_number', 'status_kyc']


class UserLogoutSerializer(serializers.Serializer):
    pass
