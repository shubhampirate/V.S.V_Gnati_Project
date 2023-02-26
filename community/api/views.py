from rest_framework.generics import GenericAPIView
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.contrib.auth import authenticate

from .models import User, Family, OccupationAddress
from .serializers import LoginSerializer, MemberSerializer, FamilySerializer, OccupationAddressSerializer

from django.db.models import Q
import random

# Create your views here.
class LoginAPI(GenericAPIView):
	
	serializer_class = LoginSerializer
	
	def post(self,request,*args,**kwargs ):
		username = request.data.get('username',None)
		password = request.data.get('password',None)
		user = authenticate(username = username, password = password)
		if user :
			serializer = self.serializer_class(user)
			token = Token.objects.get(user=user)
			return Response({"status" : True ,"data" : {'token' : token.key,'email' : user.username}, "message" : 'Login Success'},status = status.HTTP_200_OK)
		return Response({"status" : False ,"data" : {}, "message" : 'Invalid Credentials'},status = status.HTTP_401_UNAUTHORIZED)
	
class MemberListAPI(GenericAPIView):
	
	serializer_class = MemberSerializer
	queryset = User.objects.all()
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request):
		try:
			users = self.get_queryset()
			serializer = self.serializer_class(users, many=True)
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request):
		try:
			filter_data = request.data
			filters = filter_data['filters']
			if 'gender' not in filters:
				pass
			'''if filter_data['name'] == 'all':
				if filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
					users = User.objects.filter(city__icontains = filter_data['city'], village__in = filter_data['village'], gender__in =  filter_data['gender'])
				elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
					users = User.objects.filter(village__in = filter_data['village'], gender__in =  filter_data['gender'])
				elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
					users = User.objects.filter(city__icontains = filter_data['city'], gender__in =  filter_data['gender'])
				elif filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
					users = User.objects.filter(city__icontains = filter_data['city'], village__in = filter_data['village'])
				elif filter_data['city'] == 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
					users = User.objects.filter(gender__in =  filter_data['gender'])
				elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
					users = User.objects.filter(village__in = filter_data['village'])
				elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] == 'all':
					users = User.objects.filter(city__icontains = filter_data['city'])
				else:
					users = self.get_queryset()
			else:
				name = filter_data['name'].split(" ")
				fname = name[0]
				lname = name[len(name)-1]
				if len(name) == 1:
					if filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(name__icontains = fname, city__icontains = filter_data['city'], village__icontains = filter_data['village'], gender =  filter_data['gender'])
					elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(name__icontains = fname, village__icontains = filter_data['village'], gender =  filter_data['gender'])
					elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(name__icontains = fname, city__icontains = filter_data['city'], gender =  filter_data['gender'])
					elif filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(name__icontains = fname, city__icontains = filter_data['city'], village__icontains = filter_data['village'])
					elif filter_data['city'] == 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(name__icontains = fname, gender =  filter_data['gender'])
					elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(name__icontains = fname, village__icontains = filter_data['village'])
					elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(name__icontains = fname, city__icontains = filter_data['city'])
					else:
						users = User.objects.filter(name__icontains = fname)
				else:
					if filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), city__icontains = filter_data['city'], village__icontains = filter_data['village'], gender =  filter_data['gender']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, city__icontains = filter_data['city'], village__icontains = filter_data['village'], gender =  filter_data['gender'])
					elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), village__icontains = filter_data['village'], gender =  filter_data['gender']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, village__icontains = filter_data['village'], gender =  filter_data['gender'])
					elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), city__icontains = filter_data['city'], gender =  filter_data['gender']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, city__icontains = filter_data['city'], gender =  filter_data['gender'])
					elif filter_data['city'] != 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), city__icontains = filter_data['city'], village__icontains = filter_data['village']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, city__icontains = filter_data['city'], village__icontains = filter_data['village'])
					elif filter_data['city'] == 'all' and filter_data['village'] == 'all' and filter_data['gender'] != 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), gender =  filter_data['gender']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, gender =  filter_data['gender'])
					elif filter_data['city'] == 'all' and filter_data['village'] != 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), village__icontains = filter_data['village']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, village__icontains = filter_data['village'])
					elif filter_data['city'] != 'all' and filter_data['village'] == 'all' and filter_data['gender'] == 'all':
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname), city__icontains = filter_data['city']) | User.objects.filter(first_name__icontains = lname, last_name__icontains = fname, city__icontains = filter_data['city'])
					else:
						users = User.objects.filter(Q(name__icontains = fname) | Q(name__icontains = lname))'''
				
			serializer = self.serializer_class(users, many=True)
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)

		except:
			return Response({"status" : False ,"data" : {}, "message" : "Invalid filter"}, status=status.HTTP_400_BAD_REQUEST)
		
class FamilyAPI(GenericAPIView):
	serializer_class = FamilySerializer
	queryset = Family.objects.all()
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			family = Family.objects.get(id = pk)
			family_serializer = self.serializer_class(family)
			data = dict(family_serializer.data)
			if request.user == family.head:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			occupation_address = OccupationAddress.objects.filter(family = family)
			occupation_address_serializer = OccupationAddressSerializer(occupation_address, many =True)
			data['occupations'] = list(occupation_address_serializer.data)
			members = User.objects.filter(related_family = family)
			user_serializer = MemberSerializer(members, many = True)
			data['members'] = list(user_serializer.data)
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	def post(self,request,pk):
		try:
			data = dict(request.data)
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can edit this data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
			data['family'] = family.id
			serializer = OccupationAddressSerializer(data=data)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_400_BAD_REQUEST)

	def put(self,request,pk):
		try:
			data = request.data
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can edit this data"}, status=status.HTTP_400_BAD_REQUEST)
			occupation = data.pop('occupations')
			for occ in occupation:
				occupation = OccupationAddress.objects.get(id = occ['id'])
				occupation_serializer = OccupationAddressSerializer(instance = occupation, data = occ, partial = True)
				if occupation_serializer.is_valid(raise_exception=True):
					occupation_serializer.save()
			family_serializer = self.serializer_class(instance = family, data = data, partial = True)
			if family_serializer.is_valid(raise_exception=True):
				family_serializer.save()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	
class MemberAPI(GenericAPIView):
	
	serializer_class = MemberSerializer
	queryset = User.objects.all()
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			member = User.objects.get(username = pk)
			serializer = self.serializer_class(member)
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	def post(self,request,pk):
		try:
			data = dict(request.data)
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can add member"}, status=status.HTTP_400_BAD_REQUEST)
			data['password'] = data['name'][:10]+str(random.randint(1000,9999))
			#data['native_village'] = family.head.village
			data['related_family'] = family.id
			data['username'] = data['password']
			serializer = MemberSerializer(data=data)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	
	def put(self,request,pk):
		try:
			data = dict(request.data)
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can edit member"}, status=status.HTTP_400_BAD_REQUEST)
			data['password'] = data['username']
			#data['native_village'] = family.head.native_village
			data['related_family'] = family.id
			user = User.objects.get(username = data['username'])
			serializer = MemberSerializer(instance = user, data=data, partial = True)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def delete(self,request,pk):
		try:
			email = request.data['email']
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can delete member"}, status=status.HTTP_400_BAD_REQUEST)
			user = User.objects.get(email = email)
			user.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)