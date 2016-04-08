from django.test import TestCase

from .models import Client, ProductArea, FeatureRequest

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


class FeatureRequestTests(TestCase):
    def test_creation(self):
        """Test basic creation API"""

        title = 'Test feature title'
        description = 'Test feature description.'

        feature = FeatureRequest(
            title=title,
            description=description,
            client=Client.objects.create(name='test_client'),
            client_priority=1,
            target_date='2016-1-1',
            product_area=ProductArea.objects.create(name='test_area')
        )

        feature.save()

        # Verify all data goes in and comes out the right way
        assert feature.title == title

        assert feature.description == description

        self.assertIsInstance(feature.client, Client)
        assert feature.client.name == 'test_client'

        assert feature.client_priority == 1

        assert feature.target_date == '2016-1-1'

        self.assertIsInstance(feature.product_area, ProductArea)
        assert feature.product_area.name == 'test_area'

    def test_unique_priority(self):
        """For each Client, there should be no more than one FeatureRequest with
        a given client_priority"""

        client = Client.objects.create(name='test_client')
        area = ProductArea.objects.create(name='test_area')
        priority = 1

        # Make an FR for client, priority=1
        feature = FeatureRequest(
            title='',
            description='',
            client=client,
            client_priority=priority,
            target_date='2016-1-1',
            product_area=area
        )

        feature.save()

        # Make another FR for same client, same priority
        impostor = FeatureRequest(
            title='',
            description='',
            client=client,
            client_priority=priority,
            target_date='2016-1-1',
            product_area=area
        )

        # We'll nail down the exact exception later
        with self.assertRaises(Exception):
            impostor.save()
