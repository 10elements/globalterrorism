from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_protect

from .models import TerrorAttackRecord
from django.db.models import Count
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
import numpy as np
import json
import os
from django.conf import settings

# loading features ect.
print('loading features')
features = np.load(os.path.join(settings.PROJECT_ROOT, 'features.npy'))
sorted_indexes = np.load(os.path.join(settings.PROJECT_ROOT, 'sortedIndexes.npy'))
sorted_Mat = np.load(os.path.join(settings.PROJECT_ROOT, 'sortedMat.npy'))
with open(os.path.join(settings.PROJECT_ROOT, 'terrorGroupsIndexes.json'), encoding='ISO-8859-1') as f:
    terror_groups_indexes = json.load(f)
print('features loaded')


# Create your views here.
def dashboard_page(request):
    return render(request, 'dashboard/home.html')


@cache_page(60 * 3)
def attacks_yearly(request):
    print('inside attacks_yearly')
    records = TerrorAttackRecord.objects.values('iyear') \
        .annotate(total=Count('iyear')).order_by('iyear')
    data = []
    for record in records:
        data.append([record['iyear'], record['total']])
    return JsonResponse(data, safe=False)


@cache_page(60 * 3)
def attacks_map(request):
    print('inside attacks_map')
    records = TerrorAttackRecord.objects.values('country').annotate(total=Count('country'))
    data = {}
    for record in records:
        data[record['country']] = record['total']
    return JsonResponse(data)


@cache_page(60)
def attacks_map_specific_year(request, year_number):
    print('inside year')
    records = TerrorAttackRecord.objects.filter(iyear=year_number).values('country') \
        .annotate(total=Count('country'))
    data = {}
    for record in records:
        data[record['country']] = record['total']
    return JsonResponse(data)


@cache_page(60)
def attacks_yearly_specific_country(request, country_name):
    records = TerrorAttackRecord.objects.filter(country=country_name).values('iyear') \
        .annotate(total=Count('iyear')).order_by('iyear')
    data = []
    for record in records:
        data.append([record['iyear'], record['total']])
    return JsonResponse(data, safe=False)


@csrf_protect
def terror_group_info(request):
    gname = request.POST['group_of_interest']
    index = terror_groups_indexes[gname]
    res = []
    sorted_features = features[sorted_indexes[index]]
    ranks = sorted_Mat[index]
    for i in range(30):
        res.append([sorted_features[i], int(np.sqrt(int(100 * ranks[i]))) + 5])
        # res.append([sorted_features[i], 20])
    print(res)
    return JsonResponse(res, safe=False)
