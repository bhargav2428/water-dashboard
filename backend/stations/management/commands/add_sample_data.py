

from django.core.management.base import BaseCommand
from stations.models import Station

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        stations = [
            {'name': 'Station 1', 'type': 'Type 1', 'state': 'State 1', 'latitude': 12.9716, 'longitude': 77.5946},
            {'name': 'Station 2', 'type': 'Type 2', 'state': 'State 1', 'latitude': 20.5937, 'longitude': 78.9629},
            {'name': 'Station 3', 'type': 'Type 1', 'state': 'State 2', 'latitude': 28.7041, 'longitude': 77.1025},
        ]
        for station in stations:
            Station.objects.create(**station)
        self.stdout.write(self.style.SUCCESS('Sample data added'))

