from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators


class ClientUser(AbstractUser):
    email = models.EmailField(blank=False, verbose_name='Email', unique=True)
    age = models.PositiveSmallIntegerField(verbose_name='Возвраст', null=True, blank=True)
    avatar = models.ImageField(upload_to="photos/%Y/%m/%d", verbose_name='Аватар', null=True, blank=True)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name='Категории', null=True)

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name='Категория')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['id']
