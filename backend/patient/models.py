from django.db import models
from django.utils import timezone
from accounts.models import ProfileUser  
import uuid
from django.utils.translation import gettext_lazy as _ 

class Patient(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    first_name = models.CharField(_('First Name'), max_length=100)
    last_name = models.CharField(_('Last Name'), max_length=100)
    age = models.PositiveIntegerField(_('Age'))
    email = models.EmailField(_('Email'), max_length=255, blank=True, null=True)
    phone_number = models.CharField(_('Phone Number'), max_length=15)
    profile_photo = models.ImageField(_('Profile Photo'), upload_to='patients/', blank=True, null=True)
    registered_by = models.ForeignKey(ProfileUser, on_delete=models.CASCADE, related_name='registered_patients')

    created_at = models.DateTimeField(_('Created At'), default=timezone.now)
    updated_at = models.DateTimeField(_('Updated At'), auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = _('Patient')
        verbose_name_plural = _('Patients')
