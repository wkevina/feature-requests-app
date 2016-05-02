from django.test import TestCase
from django.core.urlresolvers import reverse

import project.settings as settings
from .usermixin import UserMixin

login_url = reverse(settings.LOGIN_URL)

class TestLogin(UserMixin, TestCase):
    """Test login view"""

    def test_served(self):
        """Should serve login page"""

        response = self.client.get(login_url, follow=True)

        self.assertTemplateUsed(response, 'registration/login.html')


    def test_login(self):
        """Should log user in and redirect"""

        # Sanity check that bad logins do fail
        bad_response = self.client.post(
            login_url,
            dict(username='super_user', password='wrong'))

        self.assertTemplateUsed(bad_response, 'registration/login.html')


        response = self.client.post(
            login_url,
            dict(username='super_user', password='password'),
            follow=True)

        self.assertRedirects(response, reverse('index'))

        request = response.context['request']

        # Verify user is logged in
        self.assertIn('_auth_user_id', self.client.session)
        self.assertEqual(int(self.client.session['_auth_user_id']),
                         self.super_user.pk)
