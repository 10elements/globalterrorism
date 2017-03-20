import os
# set DJANGO_SETTINGS_MODULE environment variable to 'globalterrorism.settings'
os.environ['DJANGO_SETTINGS_MODULE'] = 'globalterrorism.settings'

# import and setup django
import  django
django.setup()

import csv
from dashboard.models import TerrorAttackRecord
with open('globalterrorism.csv', encoding = 'ISO-8859-1', newline = '') as f:
	reader = csv.reader(f)
	next(reader)
	for row in reader:
		record = TerrorAttackRecord()
		record.iyear = int(row[0]) if row[0] != '' else 0
		record.country = row[1]
		record.region = row[2]
		record.crit_1 = row[3]
		record.cirt_2 = row[4]
		record.cirt_3 = row[5]
		record.attacktype_1 = row[6]
		record.attacktype_2 = row[7]
		record.attacktype_3 = row[8]
		record.targettype_1 = row[9]
		record.targetsubtype_1 = row[10]
		record.targettype_2 = row[11]
		record.targetsubtype_2 = row[12]
		record.targettype_3 = row[13]
		record.targetsubtype_3 = row[14]
		record.gname_1 = row[15]
		record.gname_2 = row[16]
		record.gname_3 = row[17]
		record.weaptype_1 = row[18]
		record.weapsubtype_1 = row[19]
		record.weaptype_2 = row[20]
		record.weapsubtype_2 = row[21]
		record.weaptype_3 = row[22]
		record.weapsubtype_3 = row[23]
		record.weaptype_4 = row[24]
		record.weapsubtype_4 =  row[25]
		record.nkill = float(row[26]) if row[26] != '' else -1.0
		record.nwound = float(row[27]) if row[27] != '' else -1.0
		record.save()
print('import finished')

