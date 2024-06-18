from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GeoDataViewSet

router = DefaultRouter()
router.register(r'geodata', GeoDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
