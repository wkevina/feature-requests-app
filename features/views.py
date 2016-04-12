from rest_framework import viewsets

from .serializers import *
from .models import FeatureRequest, Client, ProductArea


class FeatureRequestViewSet(viewsets.ModelViewSet):
    queryset = FeatureRequest.objects.all()
    serializer_class = FeatureRequestSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProductAreaViewSet(viewsets.ModelViewSet):
    queryset = ProductArea.objects.all()
    serializer_class = ProductAreaSerializer
