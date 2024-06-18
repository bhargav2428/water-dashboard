from rest_framework import viewsets
from .models import GeoData
from .serializers import GeoDataSerializer

class GeoDataViewSet(viewsets.ModelViewSet):
    queryset = GeoData.objects.all()
    serializer_class = GeoDataSerializer
