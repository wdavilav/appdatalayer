import json
import os

import django
from django.core.management import BaseCommand

from config import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.maps.models import Customer


class Command(BaseCommand):
    help = "It allows me to insert test data into the software"

    def handle(self, *args, **options):
        with open(f'{settings.BASE_DIR}/files/customers.json', encoding='utf8') as json_file:
            for item in json.load(json_file):
                customer = Customer.objects.get_or_create(names=item['names'], latitude=item['latitude'], longitude=item['longitude'])
                print(customer)
