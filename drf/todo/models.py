from django.db import models

from client.models import ClientUser


class Project(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name='Название проекта')
    repo = models.URLField(max_length=200, verbose_name='Ссылка на репозиторий', null=True, blank=True)
    user = models.ManyToManyField(ClientUser)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'


class ToDo(models.Model):
    project = models.ForeignKey('Project', on_delete=models.CASCADE, verbose_name='Проект')
    content = models.TextField(blank=True, verbose_name='Текст заметки')
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    time_update = models.DateTimeField(auto_now=True, verbose_name='Время изменения')
    author = models.ForeignKey(ClientUser, on_delete=models.CASCADE, verbose_name='Автор заметки')
    is_active = models.BooleanField(default=True, verbose_name='Активность')

    is_deleted = models.BooleanField(default=False, verbose_name='Удален', null=True)

    def __str__(self):
        return f'{self.content} {self.author}'

    class Meta:
        verbose_name = 'заметка'
        verbose_name_plural = 'заметки'







