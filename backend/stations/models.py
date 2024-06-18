from django.db import models

class GeoData(models.Model):
    objectid = models.IntegerField()
    station_code = models.CharField(max_length=20)
    station_name = models.CharField(max_length=100)
    station_type = models.CharField(max_length=50)
    lat = models.FloatField()
    long = models.FloatField()
    basin_name = models.CharField(max_length=200)
    sub_basin_name = models.CharField(max_length=200)
    created_date = models.DateTimeField()
    state_name = models.CharField(max_length=100)
    geometry = models.JSONField() 

    def __str__(self):
        return self.station_name
