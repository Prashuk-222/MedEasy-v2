from django.urls import path
from .views import PatientViewSet

urlpatterns = [
    path('patients/', PatientViewSet.as_view({'get': 'list', 'post': 'create'}), name='patient-list'),
    path('patients/<uuid:pk>/', PatientViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='patient-detail'),
]
