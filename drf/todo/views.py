from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter
from todo.models import Project, ToDo
from todo.serializers import ProjectGetSerializer, ToDoGetSerializer, ProjectSerializer, ProjectGetPostSerializer


class ProjectGetModeViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectGetSerializer


class ProjectGetPostModeViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectGetPostSerializer


class ToDoGetModeViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoGetSerializer


def project_get(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)

    json_data = JSONRenderer().render(serializer.data)
    return HttpResponse(json_data)


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class ProjectCustomFilterViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectGetPostSerializer
    filterset_class = ProjectFilter
    pagination_class = ArticleLimitOffsetPagination

