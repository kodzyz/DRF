from rest_framework import serializers
from .models import ClientUser


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientUser
        fields = ('username', 'first_name', 'last_name', 'age',  'email', 'cat')
