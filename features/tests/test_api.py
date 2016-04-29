from rest_framework.test import APITestCase

from ..models import FeatureRequest, Client, ProductArea

def has(d, key):
    if d.get(key) is not None:
        return True
    else:
        return False


class TestApi(APITestCase):
    def test_root(self):
        """Test api root URL is accessible"""

        request = self.client.get('/api/', format='json')

        self.assertEqual(request.status_code, 200)

        data = request.data

        # Should have a url for features
        self.assertTrue(has(data, 'features'))
        # And productarea
        self.assertTrue(has(data, 'productarea'))
        # And client
        self.assertTrue(has(data, 'client'))


class TestFeaturesAPI(APITestCase):
    def test_get_list(self):
        """Should return list of all feature requests"""

        request = self.client.get('/api/features/')

        response = request.data

        self.assertEqual(response['count'], 9)

        self.assertEqual(len(response['results']), 9)

        results = response['results']

        for i in range(0, 9):
            feature = results[i]

            target_date = feature['target_date']
            self.assertEqual(target_date, '2016-05-01')

            ticket_url = feature['ticket_url']
            self.assertEqual(ticket_url, 'http://google.com')

            client = feature['client']
            product_area = feature['product_area']

            if i % 3 == 0:
                self.assertEqual(client, 'http://testserver/api/client/1/')
                self.assertEqual(product_area, 'http://testserver/api/productarea/1/')
            elif i % 3 == 1:
                self.assertEqual(client, 'http://testserver/api/client/2/')
                self.assertEqual(product_area, 'http://testserver/api/productarea/2/')
            else:
                self.assertEqual(client, 'http://testserver/api/client/3/')
                self.assertEqual(product_area, 'http://testserver/api/productarea/3/')

            client_priority = feature['client_priority']

            if i < 3:
                self.assertEqual(client_priority, 1)
            elif i < 6:
                self.assertEqual(client_priority, 2)
            else:
                self.assertEqual(client_priority, 3)

    @classmethod
    def setUpTestData(cls):
        c_a = Client.objects.create(name='Client A')
        c_b = Client.objects.create(name='Client B')
        c_c = Client.objects.create(name='Client C')

        p_a = ProductArea.objects.create(name='Sales')
        p_b = ProductArea.objects.create(name='Billing')
        p_c = ProductArea.objects.create(name='Marketing')

        for priority in range(1, 4):
            FeatureRequest.objects.create(
                title='',
                description='',
                client=c_a,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_a,
                ticket_url='http://google.com'
            )

            FeatureRequest.objects.create(
                title='',
                description='',
                client=c_b,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_b,
                ticket_url='http://google.com'
            )

            FeatureRequest.objects.create(
                title='',
                description='',
                client=c_c,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_c,
                ticket_url='http://google.com'
            )
