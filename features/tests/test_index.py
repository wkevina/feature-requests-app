from django.test import TestCase
from .usermixin import UserMixin

class TestIndex(UserMixin, TestCase):
    """Verify the index page is served properly"""

    def test_login_required(self):
        """Should redirect to login page if not authenticated"""

        # Ensure no user is authenticated
        self.client.logout()

        # Change LOGIN_URL ass actual value doesn't matter
        with self.settings(LOGIN_URL='/test_login'):
            response = self.client.get('/', follow=False)

            self.assertRedirects(
                response, '/test_login?next=/', target_status_code=404)

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

    def test_csrf_cookie_set(self):
        """Should set csrf token on client"""

        response = self.client.get('/')

        self.assertIn('csrftoken', self.client.cookies)

        self.client.logout()

        self.assertNotIn('csrftoken', self.client.cookies)

    def setUp(self):
        self.client.force_login(user=self.super_user)
