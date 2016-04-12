import django.db
from django.test import TestCase

from ..service import shift_client_priority
from ..models import Client, ProductArea, FeatureRequest


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

        with self.assertRaises(django.db.IntegrityError):
            impostor.save()

def add_feature(client, product_area, **kwargs):
    args = dict(client=client,
                product_area=product_area,
                target_date='2016-1-1')

    args.update(kwargs)

    return FeatureRequest.objects.create(**args)


class TestShiftClientPriority(TestCase):
    """Test service.shift_client_priority"""

    def setUp(self):
        # Prepare a Client and ProductArea for our use
        self.client = Client.objects.create(name='test client')
        self.area = ProductArea.objects.create(name='test area')

    def test_basic(self):
        """Should shift all priorities up by one"""
        # Add 10 features with ascending priority, store id
        added = [add_feature(self.client, self.area, client_priority=i).id
                 for i in range(1, 11)]

        query = FeatureRequest.objects.filter(client=self.client)

        # Shift priorities to free up 1
        shift_client_priority(1, query)

        # Actual list of [(id, client_priority) ... ]
        priorities = query.values_list('pk', 'client_priority')\
                                           .order_by('pk')

        # Expected [(id, client_priority) ... ]
        should_be = list(zip(added, range(2, 12)))

        self.assertEqual(list(priorities), should_be)

    def test_find_gap(self):
        """Should find gap in sequence, minimizing affected models"""

        # Make contiguous range
        for i in range(1, 11):
            add_feature(self.client, self.area, client_priority=i)

        # Add more, leaving a gap at 11
        for i in range(12, 15):
            add_feature(self.client, self.area, client_priority=i)

        query = FeatureRequest.objects.filter(client=self.client)

        shift_client_priority(1, query)

        priorities = query.values_list('client_priority', flat=True)\
                                           .order_by('client_priority')

        assert list(priorities) == list(range(2, 15))
