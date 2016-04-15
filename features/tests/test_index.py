from django.test import TestCase

class TestIndex(TestCase):
    """Verify the index page is served properly"""

    def test_root(self):
        # Fetch page from '/'
        reponse = self.client.get('/')
        # Should respond OK
        self.assertEqual(reponse.status_code, 200)
        # Should be rendered from a particular template
        self.assertEqual(reponse.templates[0].name, 'features/index.html')

    def test_only_root(self):
        """Should only be served from /"""

        # Fetch from path that shouldn't exist
        response = self.client.get('/extrastuff')
        # Should 404 out
        self.assertEqual(response.status_code, 404)

        # Fetch from path that may exist
        response = self.client.get('/api/')

        # Make sure it's not the index if it does exist
        if response.status_code == 200:
            if response.templates:
                self.assertNotEqual(response.templates[0].name, 'features/index.html')
