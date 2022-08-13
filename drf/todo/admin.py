from django.contrib import admin
from todo.models import *


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'repo')
    list_display_links = ('id', 'repo')
    search_fields = ('name',)


class ToDoAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'content', 'time_create', 'time_update', 'project', 'is_active')
    list_display_links = ('id', 'project', 'author')
    search_fields = ('author', 'content')


# Register your models here.
admin.site.register(Project, ProjectAdmin)
admin.site.register(ToDo, ToDoAdmin)
