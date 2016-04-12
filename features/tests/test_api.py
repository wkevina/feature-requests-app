from rest_framework.test import APITestCase

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
