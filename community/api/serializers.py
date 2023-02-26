from rest_framework import serializers
from .models import User, Family, OccupationAddress, Event, EventImage

class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=32,min_length=8,write_only = True)
    
    class Meta:
        model = User
        fields = ['username','password']

class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class FamilySerializer(serializers.ModelSerializer):
	class Meta:
		model = Family
		fields = '__all__'

class OccupationAddressSerializer(serializers.ModelSerializer):
	class Meta:
		model =  OccupationAddress
		fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model =  Event
		fields = '__all__'

class EventImageSerializer(serializers.ModelSerializer):
	event = EventSerializer()
	class Meta:
		model =  EventImage
		fields = '__all__'