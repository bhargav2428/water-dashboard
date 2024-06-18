import json
from django.core.management.base import BaseCommand
from stations.models import GeoData

class Command(BaseCommand):
    help = 'Load sample GeoJSON data into the database'

    def handle(self, *args, **kwargs):
        with open('D:/workspace/dev/backend/groundwater_points_with_states.geojson', 'r') as file:
            data = json.load(file)
            features = data['features']

            for feature in features:
                properties = feature['properties']
                geometry = feature['geometry']

                GeoData.objects.create(
                    objectid=properties['objectid'],
                    station_code=properties['station_code'],
                    station_name=properties['station_name'],
                    station_type=properties['station_type'],
                    lat=properties['lat'],
                    long=properties['long'],
                    basin_name=properties['basin_name'],
                    sub_basin_name=properties['sub_basin_name'],
                    created_date=properties['created_date'],
                    state_name=properties['State_Name'],
                    geometry=geometry
                )

        self.stdout.write(self.style.SUCCESS('Successfully loaded sample GeoJSON data'))
