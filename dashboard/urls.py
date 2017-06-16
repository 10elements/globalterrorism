from django.conf.urls import url
from . import views

app_name = 'dashboard'
urlpatterns = [
    url(r'^$', views.dashboard_page, name = 'dashboard_home_page'),
    url(r'^attacksyearly/$', views.attacks_yearly, name = 'attacks_yearly'),
    url(r'^attacksmap/$', views.attacks_map, name = 'attacks_map'),
    url(r'^attacksmap/(?P<year_number>[0-9]{4})/$', views.attacks_map_specific_year,
        name = 'attacks_map_specific_year'),
    url(r'^attacksyearly/(?P<country_name>[a-zA-Z]+\s*[a-zA-Z]+)/$', views.attacks_yearly_specific_country,
        name = 'attacks_yearly_specific_country'),
    url(r'^terrorgroup/$', views.terror_group_info, name = 'terror_group_info'),
    url(r'^targetsmap/(?P<target>[0-9]+)/$', views.map_specific_target, name = 'map_specific_target'),
    url(r'^targets/$', views.targets, name = 'targets')
]
