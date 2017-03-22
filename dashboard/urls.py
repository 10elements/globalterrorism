from django.conf.urls import url
from . import views

app_name = 'dashboard'
urlpatterns = [
    url(r'^$', views.dashboard_page, name = 'dashboard_home_page'),
    url(r'^attacksyearly/$', views.attacks_yearly, name = 'attacks_yearly'),
    url(r'^attacksmap/$', views.attacks_map, name = 'attacks_map'),
    url(r'^attacksmap/(?P<year_number>[0-9]{4})/$', views.attacks_map_specific_year,
        name = 'attacks_map_specific_year'),
    url(r'attacksyearly/(?P<country_name>[a-zA-Z]+)/$', views.attacks_yearly_specific_country,
        name = 'attacks_yearly_specific_country')
]
