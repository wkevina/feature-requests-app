from urllib.parse import urlparse

from django.core.urlresolvers import resolve

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .serializers import *
from .models import FeatureRequest, Client, ProductArea
from .service import shift_client_priority


def get_from_url(url):
    """Return model associated with url"""
    o = urlparse(url)
    path = o.path
    # inspired by http://stackoverflow.com/questions/21406625/
    func, unused, kwargs = resolve(path)

    model = func.cls.serializer_class.Meta.model

    return model.objects.get(pk=kwargs['pk'])


class FeatureRequestViewSet(viewsets.ModelViewSet):
    queryset = FeatureRequest.objects.all()
    serializer_class = FeatureRequestSerializer

    def update(self, request, *args, **kwargs):

        def _update(serializer, extra={}):
            """Updates model given a validated serializer instance"""

            self.perform_update(serializer)
            extra.update(serializer.data)
            return Response(extra)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data,
                                         partial=partial)

        if serializer.is_valid():
            return _update(serializer)
        else:
            if 'non_field_errors' in serializer.errors:

                # Nitty gritty

                # Make room for update by moving other client_priority's update

                # Take values from request first then fallback to instance
                # values to accomodate partial updates
                if 'client' in serializer.data:
                    client = get_from_url(serializer.data['client'])
                else:
                    client = instance.client

                if 'client_priority' in serializer.data:
                    priority = int(serializer.data['client_priority'])
                else:
                    priority = instance.client_priority

                # Free up client_priority=priority for client=client set
                # Returns list of affected models
                affected = shift_client_priority(priority,
                                      FeatureRequest.objects.filter(
                                          client=client))

                # Rebuild serializer
                serializer = self.get_serializer(instance, data=request.data,
                                                 partial=partial)

                serializer.is_valid(raise_exception=True)

                conflicted_with = [model.id for model in affected]

                return _update(serializer, dict(conflicted_with=conflicted_with))
            else:
                # have serializer raise exception
                serializer.is_valid(raise_exception=True)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProductAreaViewSet(viewsets.ModelViewSet):
    queryset = ProductArea.objects.all()
    serializer_class = ProductAreaSerializer
