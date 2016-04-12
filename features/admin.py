from django.contrib import admin

from .models import FeatureRequest, Client, ProductArea

admin.site.register([FeatureRequest, Client, ProductArea])
