from django.conf.urls import url, include
from rest_framework import routers

from .views import FeatureRequestViewSet, ClientViewSet, ProductAreaViewSet

router = routers.DefaultRouter()

router.register(r'features', FeatureRequestViewSet)
router.register(r'client', ClientViewSet)
router.register(r'productarea', ProductAreaViewSet)

print(router.urls)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
