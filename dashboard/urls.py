from django.conf.urls import url
from . import views

app_name = 'dashboard'
urlpatterns = [
    url(r'^$', views.dashboard_page, name = 'dashboard_home_page'),
    url(r'^attacksyearly/$', views.attacks_yearly, name = 'attacks_yearly'),
    url(r'^attacksmap/$', views.attacks_map, name = 'attacks_map')
]