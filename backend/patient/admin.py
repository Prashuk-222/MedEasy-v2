from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'age', 'email', 'phone_number', 'registered_by', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'phone_number']
    list_filter = ['created_at', 'registered_by']