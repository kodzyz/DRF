from rest_framework.routers import DefaultRouter
from .views import ProjectGetModeViewSet, ProjectGetPostModeViewSet, ToDoGetModeViewSet, ProjectCustomFilterViewSet, \
    TodoModelViewSet
from django.urls import path, include

app_name = 'todo'

router = DefaultRouter()
filter_router = DefaultRouter()

router.register('project_get', ProjectGetModeViewSet)
router.register('project', ProjectGetPostModeViewSet)
router.register('todo_get', ToDoGetModeViewSet)

filter_router.register('project', ProjectCustomFilterViewSet)
filter_router.register('todo', TodoModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(filter_router.urls)),

]
