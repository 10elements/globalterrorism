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
    res = TerrorAttackRecord.objects.values('iyear').annotate(total = Count('iyear')).order_by('iyear')
    data = []
    for record in res:
        data.append(record['total'])
    return JsonResponse(data, safe = False)

@cache_page(60 * 3)
def attacks_map(request):
    print('inside attacks_map')
    res = TerrorAttackRecord.objects.values('country').annotate(total = Count('country'))
    data = {}
    for record in res:
        data[record['country']] = record['total']
    return JsonResponse(data)