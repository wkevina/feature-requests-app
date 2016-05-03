from urllib.parse import urlparse

from django.core.urlresolvers import resolve


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.exceptions import ValidationError
from rest_framework.settings import api_settings

from .serializers import *
from .models import FeatureRequest, Client, ProductArea
from .service import shift_client_priority

# TODO: get value programmatically from DRF
NON_FIELD_ERRORS_KEY = api_settings.NON_FIELD_ERRORS_KEY


def _resolve_url(url):
    o = urlparse(url)
    path = o.path
    # inspired by http://stackoverflow.com/questions/21406625/
    func, unused, kwargs = resolve(path)

    return func, kwargs


def get_from_url(url):
    """Return model associated with url"""

    func, kwargs = _resolve_url(url)
    model = func.cls.serializer_class.Meta.model

    return model.objects.get(pk=kwargs['pk'])


def pk_from_url(url):
    """Uses serializer to extract primary key"""

    _, kwargs = _resolve_url(url)

    return kwargs['pk']


class FeatureRequestViewSet(viewsets.ModelViewSet):
    queryset = FeatureRequest.objects.all()
    serializer_class = FeatureRequestSerializer

    def get_queryset(self):
        params = self.request.query_params
        key = None

        # Allow filtering by id
        # Supports list
        if 'id[]' in params:
            key = 'id[]'
        elif 'id' in params:
            key = 'id'

        if key:
            id_list = params.getlist(key)
            return FeatureRequest.objects.filter(id__in=id_list)

        return FeatureRequest.objects.all()

    def update(self, request, *args, **kwargs):
        try:
            return super(FeatureRequestViewSet, self).update(
                request, *args, **kwargs.copy())

        except ValidationError as ex:
            if NON_FIELD_ERRORS_KEY in ex.detail:
                instance = self.get_object()

                if 'client' in request.data:
                    client_pk = pk_from_url(request.data['client'])
                else:
                    client_pk = instance.client.pk

                if 'client_priority' in request.data:
                    priority = int(request.data['client_priority'])
                else:
                    priority = instance.client_priority

                affected = shift_client_priority(
                    priority,
                    FeatureRequest.objects.filter(client__pk=client_pk))

                response = super(FeatureRequestViewSet, self).update(
                    request, *args, **kwargs)

                # Inform client of models that have been modified
                response['X-Also-Modified'] = [model.id for model in affected]

                return response
            else:
                raise


    def create(self, request, *args, **kwargs):
        try:
            return super(FeatureRequestViewSet, self).create(
                request, *args, **kwargs)

        except ValidationError as ex:
            if NON_FIELD_ERRORS_KEY in ex.detail:
                client_pk = pk_from_url(request.data['client'])
                priority = int(request.data['client_priority'])

                affected = shift_client_priority(
                    priority,
                    FeatureRequest.objects.filter(client__pk=client_pk))

                response = super(FeatureRequestViewSet, self).create(
                    request, args, kwargs)

                # Inform client of models that have been modified
                response['X-Also-Modified'] = [model.id for model in affected]

                return response
            else:
                raise



class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ProductAreaViewSet(viewsets.ModelViewSet):
    queryset = ProductArea.objects.all()
    serializer_class = ProductAreaSerializer
