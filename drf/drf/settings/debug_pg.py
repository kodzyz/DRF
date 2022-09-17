from .debug import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'drf',
        'USER': 'root',
        'PASSWORD': '1234',
        'HOST': '127.0.0.1',
        'PORT': '54328',
    }
}

# python manage.py runserver --settings=drf.settings.debug_pg
# python manage.py migrate --settings=drf.settings.debug_pg
# python manage.py createsuperuser --settings=drf.settings.debug_pg
