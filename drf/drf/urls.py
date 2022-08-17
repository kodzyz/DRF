"""drf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from client.views import ClientAPIView, ClientUserCustomViewSet
from drf import settings
from todo.views import ProjectGetModeViewSet, ProjectGetPostModeViewSet, ToDoGetModeViewSet, project_get, \
    ProjectCustomFilterViewSet

router = DefaultRouter()
filter_router = DefaultRouter()

router.register('project_get', ProjectGetModeViewSet)
router.register('project', ProjectGetPostModeViewSet)

router.register('todo_get', ToDoGetModeViewSet)

router.register('user', ClientUserCustomViewSet)

filter_router.register('project', ProjectCustomFilterViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/clientlist/', ClientAPIView.as_view()),

    path('api/', include(router.urls)),

    path('project_get', project_get),

    # ClientUserCustom
    path('user_list', ClientUserCustomViewSet.as_view({'get': 'list'})),
    path('user_retrieve/<int:pk>', ClientUserCustomViewSet.as_view({'get': 'retrieve', 'put': 'retrieve'})),
    path('user_patch/<int:pk>', ClientUserCustomViewSet.as_view({'patch': 'retrieve'})),
    # filter_router
    path('filters/', include(filter_router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
