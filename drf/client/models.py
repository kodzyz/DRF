from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators

class ClientUser(AbstractUser):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(
        validators=[validators.validate_email],
        blank=False,
        verbose_name='email',
        unique=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    age = models.PositiveSmallIntegerField(verbose_name='age', null=True)
    avatar = models.ImageField(upload_to="photos/%Y/%m/%d", verbose_name='Аватар')
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    time_update = models.DateTimeField(auto_now=True, verbose_name='Время изменения')
    deleted = models.BooleanField(default=False, verbose_name='Удален')
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name='Категории')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
        ordering = ('-time_create',)

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name='Категория')
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['id']