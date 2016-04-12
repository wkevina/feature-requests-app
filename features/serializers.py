from .models import FeatureRequest, Client, ProductArea
from rest_framework import serializers

class FeatureRequestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FeatureRequest
        fields = '__all__'

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ProductAreaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductArea
        fields = '__all__'
