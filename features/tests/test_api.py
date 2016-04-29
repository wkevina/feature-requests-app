from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

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


    def test_get_member(self):
        """Should return a particular feature request"""

        request = self.client.get('/api/features/1/')
        feature = request.data

        target_date = feature['target_date']
        self.assertEqual(target_date, '2016-05-01')

        ticket_url = feature['ticket_url']
        self.assertEqual(ticket_url, 'http://google.com')

        client = feature['client']
        self.assertEqual(client, 'http://testserver/api/client/1/')

        product_area = feature['product_area']
        self.assertEqual(product_area, 'http://testserver/api/productarea/1/')

        client_priority = feature['client_priority']
        self.assertEqual(client_priority, 1)

    def test_post(self):
        """Should create new feature request"""

        initial_data = dict(
            title='My Title',
            description='Please add me',
            client='http://testserver/api/client/1/',
            client_priority=4,
            target_date='2000-01-01',
            product_area='http://testserver/api/productarea/1/',
            ticket_url='http://bing.com'
        )

        matches = FeatureRequest.objects.filter(
            title='My Title', client_priority=4).count()

        self.assertEqual(matches, 0)

        # login
        self.client.force_authenticate(user=self.user)

        post_request = self.client.post('/api/features/', initial_data,
                                        format='json')

        self.assertEqual(post_request.status_code, status.HTTP_201_CREATED)

        matches = FeatureRequest.objects.filter(
            title='My Title', client_priority=4).count()

        self.assertEqual(matches, 1)



    def test_put(self):
        """Should update an existing feature request"""

        model = FeatureRequest.objects.get(pk=1)

        url = '/api/features/{}/'.format(model.id)

        fetched = self.client.get(url).data
        self.assertEqual(fetched['client_priority'], model.client_priority)
        self.assertEqual(fetched['title'], model.title)

        # should be able to put same data back
        request = self.client.put(url, fetched, format='json')

        self.assertEqual(request.status_code, status.HTTP_200_OK)

        changed = fetched
        changed.update(client_priority=100, title='I WAS CHANGED')

        request = self.client.put(url, changed, format='json')

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(changed, request.data)


    def test_put_resolves_conflicts(self):
        """Should change client_priority of other models on conflict"""

        client = Client.objects.get(pk=1)

        first = FeatureRequest.objects.get(client=client, client_priority=1)
        first_url = "/api/features/{}/".format(first.id)
        second = FeatureRequest.objects.get(client=client, client_priority=2)
        third = FeatureRequest.objects.get(client=client, client_priority=3)

        self.assertNotEqual(first.client_priority,
                            second.client_priority,
                            third.client_priority)


        # Fetch first's serialized form
        serialized_first = self.client.get(first_url).data

        # Take second's priority
        serialized_first['client_priority'] = second.client_priority
        # PUT changes
        response = self.client.put(first_url, serialized_first)

        # expect 200 status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data
        print(data)
        self.assertCountEqual(data['conflicted_with'], [second.id, third.id])

        first.refresh_from_db()
        second.refresh_from_db()
        third.refresh_from_db()

        self.assertEqual(first.client_priority, 2)
        self.assertEqual(second.client_priority, 3)
        self.assertEqual(third.client_priority, 4)

    def setUp(self):
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(cls):

        # create test user
        cls.user = User.objects.create_superuser(username='test_user',
                                                 email='',
                                                 password='password')


        c_a = Client.objects.create(name='Client A')
        c_b = Client.objects.create(name='Client B')
        c_c = Client.objects.create(name='Client C')

        p_a = ProductArea.objects.create(name='Sales')
        p_b = ProductArea.objects.create(name='Billing')
        p_c = ProductArea.objects.create(name='Marketing')

        for priority in range(1, 4):
            FeatureRequest.objects.create(
                title='Title',
                description='Desc',
                client=c_a,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_a,
                ticket_url='http://google.com'
            )

            FeatureRequest.objects.create(
                title='Title',
                description='Desc',
                client=c_b,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_b,
                ticket_url='http://google.com'
            )

            FeatureRequest.objects.create(
                title='Title',
                description='Desc',
                client=c_c,
                client_priority=priority,
                target_date='2016-5-1',
                product_area=p_c,
                ticket_url='http://google.com'
            )
