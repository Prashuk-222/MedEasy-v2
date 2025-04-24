from django.db import models
from django.contrib.auth.models import User
from patient.models import Patient

class ChatMessage(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    message = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.patient.user.username}: {self.message[:30]}...'

