from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from rest_framework import routers

from .views import FeatureRequestViewSet, ClientViewSet, ProductAreaViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'features', FeatureRequestViewSet)
router.register(r'client', ClientViewSet)
router.register(r'productarea', ProductAreaViewSet)

urlpatterns = [
    # Main page only viewable if logged in
    url(r'^$', login_required(TemplateView.as_view(
        template_name='features/index.html')), name='index'),
    url(r'^api/', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
