import uuid
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import validate_email
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class MyAccountManager(BaseUserManager):
    def create_user(self, email, user_name, password=None):
        if not email:
            raise ValueError("User must have an email address.")
        if not user_name:
            raise ValueError("User must have a first name.")
        user = self.model(
            email=self.normalize_email(email),
            user_name=user_name,
        )
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, user_name, password):
        if password is None:
            raise TypeError('Superuser must have a password.')
        user = self.create_user(
            email=self.normalize_email(email),
            user_name=user_name,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class ProfileUser(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(_('User Name'), max_length=150)
    email = models.EmailField(
        _('Email'),
        max_length=255,
        unique=True,
        validators=[validate_email],
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )

    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    objects = MyAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']

    def __str__(self):
        return self.user_name
