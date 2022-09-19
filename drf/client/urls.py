from rest_framework.routers import DefaultRouter
from .views import ClientUserCustomViewSet, ClientGetModeViewSet
from django.urls import path, include

app_name = 'client'

router = DefaultRouter()

router.register('user', ClientGetModeViewSet)

urlpatterns = [
    path('', include(router.urls))

]
