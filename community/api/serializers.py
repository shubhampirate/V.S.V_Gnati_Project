from rest_framework import serializers
from .models import User, Family, OccupationAddress

class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=32,min_length=8,write_only = True)
    
    class Meta:
        model = User
        fields = ['username','password']