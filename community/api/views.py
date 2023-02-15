from rest_framework.generics import GenericAPIView
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.contrib.auth import authenticate

from .models import User
from .serializers import LoginSerializer

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