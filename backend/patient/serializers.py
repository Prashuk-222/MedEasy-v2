from rest_framework import serializers
from accounts.models import ProfileUser
from .models import Patient

class ProfileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileUser
        fields = ['id', 'user_name', 'email']

class PatientSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    registered_by = ProfileUserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'age', 'email', 'phone_number', 'profile_photo', 'registered_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['registered_by'] = request.user
        return super().create(validated_data)
