from rest_framework.routers import DefaultRouter
from .views import ClientUserCustomViewSet
from django.urls import path, include

app_name = 'client'

router = DefaultRouter()

router.register('user', ClientUserCustomViewSet)

urlpatterns = [
    path('', include(router.urls))

]
