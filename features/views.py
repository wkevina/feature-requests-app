from rest_framework import viewsets

from .serializers import *
from .models import FeatureRequest, Client, ProductArea
from .service import shift_client_priority

class FeatureRequestViewSet(viewsets.ModelViewSet):
    queryset = FeatureRequest.objects.all()
    serializer_class = FeatureRequestSerializer

    def update(self, request, *args, **kwargs):
        # super
        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            if 'non_field_errors' in serializer.errors:
                return self.handle_duplicate(request, serializer)
            else:
                serializer.is_valid(raise_exception=True)

    def handle_duplicate(self, request, serializer):
        #print(serializer.data)

        # client = ClientSerializer.serializer_related_field \
        #                          .get_object(
        #                              serializer.data['client'], None, args)

        #print(client)
        client = self.get_related(serializer, 'client')
        wanted_priority = int(serializer.data['client_priority'])
        print(repr(client))
        print(serializer.data)
        shift_client_priority(wanted_priority, FeatureRequest.objects.filter(client=client))

    def get_related(self, serializer, field):
        return serializer.fields['client'].to_internal_value(
            serializer.data['client'])

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        print(serializer.is_valid())
        print('No error so far')

        return super(FeatureRequestViewSet, self).create(request, args, kwargs)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProductAreaViewSet(viewsets.ModelViewSet):
    queryset = ProductArea.objects.all()
    serializer_class = ProductAreaSerializer
