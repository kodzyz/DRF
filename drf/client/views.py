from django.shortcuts import render
from rest_framework import generics, mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from .models import ClientUser
from .serializers import ClientSerializer, ClientSerializerV2


class ClientAPIView(generics.ListCreateAPIView):  # GET/POST
    queryset = ClientUser.objects.all()
    serializer_class = ClientSerializer


class ClientUserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                              mixins.CreateModelMixin, mixins.UpdateModelMixin,
                              mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """GET, PUT, PATCH, DELETE, POST"""
    queryset = ClientUser.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return ClientSerializerV2
        return ClientSerializer  # version by default
