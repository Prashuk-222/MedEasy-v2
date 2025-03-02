from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing patients.
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """
        Custom list method to return `null` instead of an empty list when no patients exist.
        """
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(None)  # ✅ Returns `null` instead of `[]`
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """
        Associate the patient with the logged-in user.
        """
        serializer.save(registered_by=self.request.user)
