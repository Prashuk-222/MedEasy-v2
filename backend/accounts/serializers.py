from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _
from .models import ProfileUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, max_length=128)
    password2 = serializers.CharField(write_only=True, max_length=128)
    class Meta:
        model = ProfileUser
        fields = ('email', 'password', 'user_name', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},  # Ensures password is write-only
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': _("The password fields didn't match.")})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        user = ProfileUser.objects.create_user(
            email=validated_data['email'],
            user_name=validated_data['user_name'],
            password=validated_data['password'],
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.user_name  
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data

