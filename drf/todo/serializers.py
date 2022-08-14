from rest_framework import serializers
from rest_framework.fields import CharField
from rest_framework.serializers import Serializer

from client.serializers import ClientSerializer
from .models import Project, ToDo


class ProjectSerializer(Serializer):
    name = CharField(max_length=100)
    user = serializers.StringRelatedField(many=True)


class ProjectGetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectGetPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoGetSerializer(serializers.ModelSerializer):
    project = ProjectGetSerializer()
    author = ClientSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
