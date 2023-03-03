from rest_framework.generics import GenericAPIView
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.contrib.auth import authenticate

from .models import User, Family, OccupationAddress, Event, Company, Job, Matrimony
from .serializers import LoginSerializer, MemberSerializer, FamilySerializer, OccupationAddressSerializer, EventSerializer, CompanySerializer, JobSerializer, MatrimonySerializer

from django.db.models import Q
import random

# Create your views here.
class LoginAPI(GenericAPIView):
	
	serializer_class = LoginSerializer
	
	def post(self,request,*args,**kwargs ):
		username = request.data.get('username',None)
		password = request.data.get('password',None)
		user = authenticate(username = username, password = password)
		# user = User.objects.get(username = username)
		# user.set_password(password)
		# user.save()
		if user :
			serializer = self.serializer_class(user)
			token,k = Token.objects.get_or_create(user=user)
			if not user.related_family:
				family = Family.objects.create(head = user)
				family.save()
				user.related_family = family
				user.save()
			if not user.related_company:
				company = "None"
			else:
				company = user.related_company.id
			if not user.related_matrimony:
				matrimony = "None"
			else:
				matrimony = user.related_matrimony.id
			return Response({"status" : True ,"data" : {'token' : token.key,'username' : user.username,'family' : user.related_family.id,'company' : company,'matrimony' : matrimony}, "message" : 'Login Success'},status = status.HTTP_200_OK)
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
			name_list = request.data["name"].split(" ")
			if len(name_list) == 0 or name_list[0] == "all":
				users = self.get_queryset()
			else:
				users = User.objects.filter(Q(name__icontains = name_list[0]) | Q(name__icontains = name_list[-1]))
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
		
	def delete(self,request,pk):
		try:
			occ = OccupationAddress.objects.get(id = pk)
			if request.user.is_staff == False:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			occ.delete()
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
			data['password'] = (data['name'][:10]+str(random.randint(1000,9999))).replace(' ',"_")
			#data['native_village'] = family.head.village
			data['related_family'] = family.id
			data['username'] = data['password']
			print(data['username'])
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
			username = request.data['username']
			family = Family.objects.get(id = pk)
			if request.user != family.head:
				return Response({"status" : False ,"data" : {}, "message" : "Only head of family can delete member"}, status=status.HTTP_400_BAD_REQUEST)
			user = User.objects.get(username = username)
			user.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class EventAPI(GenericAPIView):

	serializer_class = EventSerializer
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			event = Event.objects.get(id = pk)
			serializer = self.serializer_class(event)
			data = dict(serializer.data)
			if request.user.is_staff:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request,pk):
		try:
			event = Event.objects.filter(date__year=pk)
			serializer = self.serializer_class(event,many = True)
			data = dict()
			data['events'] = serializer.data
			if request.user.is_staff:
				data['can_add'] = True
			else:
				data['can_add'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def put(self,request,pk):
		try:
			event = Event.objects.get(id = pk)
			if request.user.is_staff == False:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(instance = event, data = request.data, partial = True)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def delete(self,request,pk):
		try:
			event = Event.objects.get(id = pk)
			if request.user.is_staff == False:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			event.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class EventListAPI(GenericAPIView):
	serializer_class = EventSerializer
	permission_classes = [permissions.IsAuthenticated,]
	queryset = Event.objects.all().order_by('-date')

	def get(self,request):
		try:
			event = self.get_queryset()
			serializer = self.serializer_class(event,many = True)
			data = dict()
			data['events'] = serializer.data
			if request.user.is_staff:
				data['can_add'] = True
			else:
				data['can_add'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request):
		try:
			if request.user.is_staff == False:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(data = request.data)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			data = serializer.data
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class CompanyAPI(GenericAPIView):

	serializer_class = CompanySerializer
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			company = Company.objects.get(id = pk)
			serializer = self.serializer_class(company)
			data = dict(serializer.data)
			if request.user.is_staff or request.user == company.posted_by:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			jobs = Job.objects.filter(company = pk)
			job_serializer = JobSerializer(jobs, many = True)
			data['jobs'] = job_serializer.data
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def put(self,request,pk):
		try:
			company = Company.objects.get(id = pk)
			if request.user.is_staff == False or request.user != company.posted_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(instance = company, data = request.data, partial = True)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def delete(self,request,pk):
		try:
			company = Company.objects.get(id = pk)
			if request.user.is_staff == False or request.user != company.posted_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			company.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class CompanyListAPI(GenericAPIView):
	serializer_class = CompanySerializer
	permission_classes = [permissions.IsAuthenticated,]
	queryset = Company.objects.all()

	def get(self,request):
		try:
			company = self.get_queryset()
			serializer = self.serializer_class(company,many = True)
			data = dict()
			data['companies'] = serializer.data
			if request.user.is_staff or request.user != company.posted_by:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request):
		try:
			#if request.user.is_staff == False:
				#return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(data = request.data)
			if serializer.is_valid(raise_exception=True):
				serializer.save(posted_by = request.user)
				company = Company.objects.get(id = serializer.data['id'])
				request.user.related_company = company
				request.user.save()
			data = serializer.data
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class JobAPI(GenericAPIView):

	serializer_class = JobSerializer
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			job = Job.objects.get(id = pk)
			serializer = self.serializer_class(job)
			data = dict(serializer.data)
			if request.user.is_staff or request.user == job.company.posted_by:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def put(self,request,pk):
		try:
			job = Job.objects.get(id = pk)
			if request.user.is_staff == False or request.user != job.company.posted_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(instance = job, data = request.data, partial = True)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def delete(self,request,pk):
		try:
			job = Job.objects.get(id = pk)
			if request.user.is_staff == False or request.user != job.company.posted_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			job.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class JobListAPI(GenericAPIView):
	serializer_class = JobSerializer
	permission_classes = [permissions.IsAuthenticated,]
	queryset = Job.objects.all()

	def get(self,request):
		try:
			job = self.get_queryset()
			serializer = self.serializer_class(job,many = True)
			data = dict()
			data['jobs'] = serializer.data
			if request.user.is_staff or request.user != job.company.posted_by:
				data['can_add'] = True
			else:
				data['can_add'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request):
		try:
			#if request.user.is_staff == False:
				#return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(data = request.data)
			company = Company.objects.get(posted_by = request.user)
			if serializer.is_valid(raise_exception=True):
				serializer.save(company = company)
			data = serializer.data
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class MatrimonyAPI(GenericAPIView):

	serializer_class = MatrimonySerializer
	permission_classes = [permissions.IsAuthenticated,]

	def get(self,request,pk):
		try:
			matrimony = Matrimony.objects.get(id = pk)
			serializer = self.serializer_class(matrimony)
			data = dict(serializer.data)
			if request.user.is_staff or request.user == matrimony.uploaded_by:
				data['can_edit'] = True
			else:
				data['can_edit'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def put(self,request,pk):
		try:
			matrimony = Matrimony.objects.get(id = pk)
			if request.user.is_staff == False or request.user != matrimony.uploaded_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(instance = matrimony, data = request.data, partial = True)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
			return Response({"status" : True ,"data" : serializer.data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def delete(self,request,pk):
		try:
			matrimony = Matrimony.objects.get(id = pk)
			if request.user.is_staff == False or request.user != matrimony.uploaded_by:
				return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			matrimony.delete()
			return Response({"status" : True ,"data" : {}, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class MatrimonyListAPI(GenericAPIView):
	serializer_class = MatrimonySerializer
	permission_classes = [permissions.IsAuthenticated,]
	queryset = Matrimony.objects.all()

	def get(self,request):
		try:
			gender = self.request.query_params['gender']
			#matrimony = self.get_queryset()
			matrimony = Matrimony.objects.filter(gender = gender)
			serializer = self.serializer_class(matrimony,many = True)
			data = dict()
			data["matrimonies"] = serializer.data
			if request.user.is_staff or request.user != matrimony.uploaded_by:
				data['can_add'] = True
			else:
				data['can_add'] = False
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
	def post(self,request):
		try:
			#if request.user.is_staff == False:
				#return Response({"status" : False ,"data" : {}, "message" : "Sorry, only admin can edit this page"}, status=status.HTTP_200_OK)
			serializer = self.serializer_class(data = request.data)
			if serializer.is_valid(raise_exception=True):
				serializer.save(uploaded_by = request.user)
				matrimony = Matrimony.objects.get(id = serializer.data['id'])
				request.user.related_matrimony = matrimony
				request.user.save()
			data = serializer.data
			return Response({"status" : True ,"data" : data, "message" : "Success"}, status=status.HTTP_200_OK)
		except:
			return Response({"status" : False ,"data" : {}, "message" : "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)