from django.shortcuts import render, get_object_or_404
from .models import TerrorAttackRecord
# from django.http import HttpResponse
from django.db.models import Count
from django.http import JsonResponse
from django.views.decorators.cache import cache_page

# Create your views here.
def dashboard_page(request):
    return render(request, 'dashboard/home.html')

@cache_page(60 * 3)
def attacks_yearly(request):
    print('inside attacks_yearly')
    records = TerrorAttackRecord.objects.values('iyear').annotate(total = Count('iyear')).order_by('iyear')
    data = []
    for record in records:
        data.append([record['iyear'], record['total']])
    return JsonResponse(data, safe = False)

@cache_page(60 * 3)
def attacks_map(request):
    print('inside attacks_map')
    records = TerrorAttackRecord.objects.values('country').annotate(total = Count('country'))
    data = {}
    for record in records:
        data[record['country']] = record['total']
    return JsonResponse(data)

@cache_page(60)
def attacks_map_specific_year(request, year_number):
    print('inside year')
    records = TerrorAttackRecord.objects.filter(iyear = year_number).values('country')\
        .annotate(total = Count('country'))
    data = {}
    for record in records:
        data[record['country']] = record['total']
    return JsonResponse(data)

@cache_page(60)
def attacks_yearly_specific_country(request, country_name):
    records = TerrorAttackRecord.objects.filter(country = country_name).values('iyear')\
        .annotate(total = Count('iyear')).order_by('iyear')
    data = []
    for record in records:
        data.append([record['iyear'], record['total']])
    return JsonResponse(data, safe = False)
