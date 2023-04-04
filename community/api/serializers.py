from rest_framework import serializers
from .models import User, Family, OccupationAddress, Event, Company, Job, Matrimony

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

class CompanySerializer(serializers.ModelSerializer):
	class Meta:
		model =  Company
		fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
	class Meta:
		model =  Job
		fields = '__all__'

class MatrimonySerializer(serializers.ModelSerializer):
	class Meta:
		model =  Matrimony
		fields = '__all__'

class MemberListSerializer(serializers.ModelSerializer):
	home_address = serializers.SerializerMethodField(read_only=True)
	gotrej = serializers.SerializerMethodField(read_only=True)
	class Meta:
		model = User
		fields = ["is_superuser",
            "is_staff",
            "is_active",
            "date_joined",
            "phone",
            "name",
            "relation",
            "dob",
            "education",
            "profession_status",
            "profession_name",
            "native_village",
            "gender",
            "blood_group",
            "maritial_status",
	    	"related_family",
	    	"related_company",
	    	"related_matrimony",
	    	"home_address",
		    "gotrej"
			]

	def get_home_address(self,obj):
		family = Family.objects.get(id=obj.related_family.id)
		serializer = FamilySerializer(family)
		return serializer.data['home_address']

	def get_gotrej(self,obj):
		family = Family.objects.get(id=obj.related_family.id)
		serializer = FamilySerializer(family)
		return serializer.data['gotrej']