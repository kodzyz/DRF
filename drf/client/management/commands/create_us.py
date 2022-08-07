from django.core.management import BaseCommand

from client.models import ClientUser
import random


class Command(BaseCommand):
    help = 'Create a user'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='User name')
        parser.add_argument('email', type=str, help='User Email')
        # parser.add_argument('cat_id', type=int, help='User Category: 2/3')
        parser.add_argument('password', action='store_const', const='1234', help='User Password')
        parser.add_argument('-a', '--admin', action='store_true', help='Create Admin')

    def handle(self, *args, **kwargs):
        username = kwargs['username']
        email = kwargs['email']
        # cat_id = kwargs['cat_id']
        password = kwargs['password']
        admin = kwargs['admin']

        if admin:
            ClientUser.objects.create_superuser(username=username, email=email, cat_id=1, password=password)
        else:
            my_list = [2, 3]
            rand_num = random.choice(my_list)
            ClientUser.objects.create_user(username=username, email=email, cat_id=rand_num, password=password)