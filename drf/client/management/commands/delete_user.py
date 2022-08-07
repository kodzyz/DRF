from django.core.management import BaseCommand

from client.models import ClientUser


class Command(BaseCommand):
    help = 'Delete users'

    def add_arguments(self, parser):
        parser.add_argument('user_id', nargs='+', type=int, help='User ID')

    def handle(self, *args, **kwargs):
        users_ids = kwargs['user_id']

        for i in users_ids:
            try:
                user = ClientUser.objects.get(pk=i)
                user.delete()
                print(f'Пользователь {user.email} c id {i} удален!')
            except ClientUser.DoesNotExist:
                print(f'Пользователь c id {i} не существует')
