from rest_framework import serializers
from .models import ClientUser


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientUser
        fields = ('id', 'username', 'first_name', 'last_name', 'age', 'email')
        # fields = '__all__'


class ClientSerializerV2(serializers.ModelSerializer):
    class Meta:
        model = ClientUser
        fields = ('id', 'username', 'first_name', 'last_name', 'age', 'email', 'is_superuser', 'is_staff')
