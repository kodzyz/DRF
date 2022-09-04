from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from .views import ClientUserCustomViewSet
from rest_framework import status
from .models import ClientUser


# 1. Написать минимум один тест для API, используя APIRequestFactory.
# 2. Написать минимум один тест для API, используя APIClient.
# 3. Написать минимум один тест для API, используя APITestCase.
# 4. Данные для тестов удобно создавать, используя mixer.


class ClientUserTestCase(TestCase):

    def setUp(self) -> None:
        self.admin = ClientUser.objects.create_superuser(username='root', password='1234')
        self.user = ClientUser.objects.create(
            email='yegorov@mail.ru',
            age=45)

    def test_get_APIRequestFactory(self):
        factory = APIRequestFactory()
        request = factory.get('/api/user/')
        force_authenticate(request, user=self.admin)
        view = ClientUserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_post_APIRequestFactory(self):
        factory = APIRequestFactory()
        request = factory.post('/api/user/', {
            "password": "1234",
            "username": "nastasi",
            "email": "nastasi@mail.ru",
            "age": 32
        }, format='json')
        force_authenticate(request, user=self.admin)
        view = ClientUserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
