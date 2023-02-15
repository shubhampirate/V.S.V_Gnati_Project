from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token

class Family(models.Model):
    head = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    home_address = models.CharField(max_length=1000, default="None")
    gotrej = models.CharField(max_length=80, default="None")

    def __str__(self):
        return self.head.username

class OccupationAddress(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    occupation_address = models.CharField(max_length=1000, default="None")

    def __str__(self):
        return self.family

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, username, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not username:
            raise ValueError('The Email must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(username, password, **extra_fields)

class User(AbstractUser):

    first_name=None
    last_name=None
    email = None
    phone = models.BigIntegerField(default=0000000000)
    name = models.CharField(max_length=100)
    relation = models.CharField(max_length=50, default="Self")
    dob = models.DateField(blank=True, null=True)
    education = models.CharField(max_length=50)
    profession_status = models.CharField(max_length=50)
    profession_name = models.CharField(max_length=100)
    native_village = models.CharField(max_length=50)
    gender = models.CharField(default = 'Male',max_length = 10)
    blood_group=models.CharField(max_length=50)
    maritial_status = models.CharField(default = 'Single',max_length = 10)
    #profile_pic = models.ImageField(upload_to = 'users/',blank = True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS=[]

    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def token(self):
        token = Token.objects.get(user=User.objects.get(self.id))
        return token