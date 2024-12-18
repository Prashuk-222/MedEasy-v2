from django.urls import path
from accounts.views import CustomTokenObtainPairView, RegisterUserView, CustomTokenRefreshView

urlpatterns = [
    path('accounts/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/register/', RegisterUserView.as_view(), name='register'),
]