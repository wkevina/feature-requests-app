from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework import routers

from .views import FeatureRequestViewSet, ClientViewSet, ProductAreaViewSet

router = routers.DefaultRouter()

router.register(r'features', FeatureRequestViewSet)
router.register(r'client', ClientViewSet)
router.register(r'productarea', ProductAreaViewSet)

urlpatterns = [
    url(r'^', TemplateView.as_view(template_name='features/index.html')),
    url(r'^api/', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
