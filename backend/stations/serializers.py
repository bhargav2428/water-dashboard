from rest_framework import serializers
from .models import GeoData

class GeoDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoData
        fields = [
            'objectid', 'station_code', 'station_name', 'station_type',
            'lat', 'long', 'basin_name', 'sub_basin_name', 'created_date',
            'state_name', 'geometry'
        ]
