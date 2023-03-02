from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token


class Company(models.Model):
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(blank = True, null=True)
    address = models.TextField(max_length=1000, default = 'N/A')
    picture = models.ImageField(upload_to = 'company/',blank = True, null=True)

    class Meta:
        verbose_name_plural = 'Companies'

    def __str__(self):
        return self.name
    
class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    details = models.TextField(max_length=1000, default = 'N/A')
    phone = models.BigIntegerField(default=0000000000)

    def __str__(self):
        return self.title

def upload_matrimony(instance, filename):
    return "matrimony/{name}/{file}".format(
        name=instance.name, file=filename
    )

class Matrimony(models.Model):
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    about = models.TextField(max_length=1000, default = 'N/A')
    phone = models.BigIntegerField(default=0000000000)
    fathers_name = models.CharField(max_length=100)
    gender = models.CharField(default = 'Male',max_length = 10)
    picture = models.ImageField(upload_to = upload_matrimony,blank = True, null=True)
    biodata = models.FileField(upload_to = upload_matrimony,blank = True, null=True)

    class Meta:
        verbose_name_plural = 'Matrimonies'

    def __str__(self):
        return self.name

class Family(models.Model):
    head = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    home_address = models.CharField(max_length=1000, default="None")
    gotrej = models.CharField(max_length=80, default="None")

    class Meta:
        verbose_name_plural = 'Families'

    def __str__(self):
        return self.head.username

class OccupationAddress(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    occupation_address = models.CharField(max_length=1000, default="None")

    def __str__(self):
        return self.family.head.username

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
    related_family = models.ForeignKey(Family, on_delete=models.PROTECT, blank=True, null=True)
    related_company = models.ForeignKey(Company, on_delete=models.PROTECT, blank=True, null=True)
    related_matrimony = models.ForeignKey(Matrimony, on_delete=models.PROTECT, blank=True, null=True)
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

def upload_path_handler(instance, filename):
    return "events/{name}/{file}".format(
        name=instance.event.name, file=filename
    )

class Event(models.Model):
    name = models.CharField(max_length=80)
    about = models.TextField(max_length=255)
    date = models.DateField()
    venue = models.CharField(max_length=1000, default="N/A")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    photos_drive = models.URLField(blank = True, null=True)
    picture = models.ImageField(upload_to = upload_path_handler,blank = True, null=True)

    def __str__(self):
        return self.name