from django.shortcuts import render, get_object_or_404
from .models import TerrorAttackRecord
from django.http import HttpResponse
from django.db.models import Count
from django.http import JsonResponse

# Create your views here.
def dashboard_page(request):
    return render(request, 'dashboard/home.html')
    # return HttpResponse('hello')

def attacks_yearly(request):
    res = TerrorAttackRecord.objects.values('iyear').annotate(total = Count('iyear')).order_by('iyear')
    data = []
    for record in res:
        data.append(record['total'])
    return JsonResponse(data, safe = False)
