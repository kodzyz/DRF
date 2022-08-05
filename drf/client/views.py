from django.shortcuts import render
from rest_framework import generics
from .models import ClientUser
from .serializers import ClientSerializer


class ClientAPIView(generics.ListCreateAPIView):  # GET/POST
    queryset = ClientUser.objects.all()
    serializer_class = ClientSerializer
