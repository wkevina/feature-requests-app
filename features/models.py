from django.db import models

class Client(models.Model):
    """Client associated with feature request"""

    # Name of client
    name = models.CharField('Name', max_length=200, unique=True)

    def __str__(self):
        return self.name

class ProductArea(models.Model):
    """Product Area category for feature requests"""

    # Name of product area
    name = models.CharField('Name', max_length=200, unique=True)

    def __str__(self):
        return self.name
