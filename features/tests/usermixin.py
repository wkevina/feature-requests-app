from django.contrib.auth.models import User

class UserMixin():
    @classmethod
    def setUpTestData(cls):
        # create test user
        cls.super_user = User.objects.create_superuser(
            username='super_user',
            email='',
            password='password')

        cls.regular_user = User.objects.create_user(
            username='regular_user',
            password='password')
