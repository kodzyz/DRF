from django.contrib import admin

from client.models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'age', 'avatar', 'email', 'cat')
    list_display_links = ('id', 'email')
    search_fields = ('username', 'email')


class CatAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)


admin.site.register(ClientUser, UserAdmin)
admin.site.register(Category, CatAdmin)
