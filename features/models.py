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

class FeatureRequest(models.Model):
    """Information about a new feature a client has requested"""

    class Meta:
        # Enforce each client_priority is unique per client
        unique_together = ('client', 'client_priority')

    # Short, descriptive name of the feature request.
    # Max length is 200 characters; better than a tweet!
    title = models.CharField('Title', max_length=200)

    # Longer description of the feature request
    description = models.TextField('Description')

    # Client that requested this feature
    client = models.ForeignKey(
        # Note the departure for this signature
        # This is the class for the relationship
        'Client',
        models.CASCADE,
        # This is the human-readable name
        verbose_name='Client'
    )

    # Numerical priority according to the client
    client_priority = models.PositiveIntegerField('Client Priority')

    # Expected completion date for request
    target_date = models.DateField('Target Date')

    # Store any URL associated with the request
    ticket_url = models.URLField('Ticket URL', blank=True, default='')

    # Which product area this request belongs to
    # Defined as a foreign key to allow modification at runtime
    product_area = models.ForeignKey(
        'ProductArea',
        on_delete=models.CASCADE,
        verbose_name='Product Area'
    )

    def __str__(self):
        return "'{title}' from {client}".format(title=self.title, client=self.client)
