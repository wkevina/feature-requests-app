from django.test import TestCase

from .models import Client, ProductArea

class ModelSanityTests(TestCase):
    def test_client(self):
        name = 'ClientA'
        # Check that the universe is roughly logical
        client_A = Client(name=name)
        client_A.save()
        assert client_A.name == name

        # This should exist, right?
        loaded_client = Client.objects.get(name=name)

        # Cool, it does. But is it what we think it is?
        assert loaded_client
        assert loaded_client.id == client_A.id
        assert loaded_client.name == client_A.name
        # I guess it is.

    def test_product_area(self):
        name = 'Sales'

        area = ProductArea(name=name)
        area.save()
        assert area.name == name

        loaded_area = ProductArea.objects.get(name=name)

        assert loaded_area
        assert loaded_area.id == area.id
        assert loaded_area.name == area.name
