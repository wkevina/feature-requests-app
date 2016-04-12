from django.test import TestCase

from ..service import shift_client_priority
from ..models import Client, ProductArea, FeatureRequest


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
