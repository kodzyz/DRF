from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from .views import TodoModelViewSet, ProjectCustomFilterViewSet
from rest_framework import status
from client.models import ClientUser
from .models import Project, ToDo


class ProjectAPIClient(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()
        self.admin = ClientUser.objects.create_superuser(username='root', password='1234')
        self.project = Project.objects.create(
            name='Django REST Framework',
            repo='https://github.com/dromanow/DRF_2022_08_01')
        self.client.login(username='root', password='1234')

    def test_get_APIClient(self):
        response = self.client.get(f'/filters/project/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_APIClient(self):
        response = self.client.put(f'/filters/project/{self.project.id}/', {
            'name': 'DRF',
            'repo': 'https://github.com/dromanow/DRF_2022_08_01',
            'user': 1
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(project.name, 'DRF')
        self.client.logout()


class ToDoAPITestCase(APITestCase):
    def setUp(self) -> None:
        self.admin = ClientUser.objects.create_superuser(username='root', password='1234')
        self.project = Project.objects.create(
            name='Django REST Framework',
            repo='https://github.com/dromanow/DRF_2022_08_01'
        )
        self.todo = ToDo.objects.create(
            content='Последний фрагмент кода демонстрирует Serializer',
            project=self.project,
            author=self.admin
        )
        self.client.login(username='root', password='1234')

    def test_get_APITestCase(self):
        response = self.client.get(f'/filters/todo/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        response = self.client.get('/filters/todo/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_APITestCase(self):
        response = self.client.post(f'/filters/todo/', {
            "content": "Рекомендуется явно указывать список полей.",
            "project": self.project.id,
            "author": self.admin.id
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        todo = ToDo.objects.get(pk=response.data.get('id'))
        self.assertEqual(todo.content, 'Рекомендуется явно указывать список полей.')

