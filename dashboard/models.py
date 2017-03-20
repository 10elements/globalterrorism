from django.db import models


# Create your models here.
class TerrorAttackRecord(models.Model):
    """docstring for TerrorAttack"""
    iyear = models.IntegerField(default=0)
    country = models.CharField(max_length=50)
    region = models.CharField(max_length=30)
    crit_1 = models.CharField(max_length=1)
    cirt_2 = models.CharField(max_length=1)
    cirt_3 = models.CharField(max_length=1)
    attacktype_1 = models.CharField(max_length=40)
    attacktype_2 = models.CharField(max_length=40)
    attacktype_3 = models.CharField(max_length=40)
    targettype_1 = models.CharField(max_length=40)
    targetsubtype_1 = models.CharField(max_length=40)
    targettype_2 = models.CharField(max_length=40)
    targetsubtype_2 = models.CharField(max_length=40)
    targettype_3 = models.CharField(max_length=40)
    targetsubtype_3 = models.CharField(max_length=40)
    gname_1 = models.CharField(max_length=60)
    gname_2 = models.CharField(max_length=60)
    gname_3 = models.CharField(max_length=60)
    weaptype_1 = models.CharField(max_length=60)
    weapsubtype_1 = models.CharField(max_length=60)
    weaptype_2 = models.CharField(max_length=60)
    weapsubtype_2 = models.CharField(max_length=60)
    weaptype_3 = models.CharField(max_length=60)
    weapsubtype_3 = models.CharField(max_length=60)
    weaptype_4 = models.CharField(max_length=60)
    weapsubtype_4 = models.CharField(max_length=60)
    nkill = models.FloatField(default=-1.0)
    nwound = models.FloatField(default=-1.0)

    def __str__(self):
        return str(self.iyear) + str(self.country) + str(self.gname_1)
