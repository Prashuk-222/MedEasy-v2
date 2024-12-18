from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import HttpResponseRedirect
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
)


class RegisterUserView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        # Save the user profile
        user = serializer.save(is_active=True)

        # Generate the JWT token after successful user registration
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Add the token to the response
        return Response({
            "user": RegisterSerializer(user).data,
            "access_token": access_token,
            "refresh_token": str(refresh),
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed:
            raise InActiveUser()
        except TokenError:
            raise InvalidToken()

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CustomTokenRefreshView(TokenRefreshView):
    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect('/#/404')

