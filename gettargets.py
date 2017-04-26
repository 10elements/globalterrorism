import pandas as pd
import numpy as np
import json

data = pd.read_csv('globalterrorism.csv', encoding = 'ISO-8859-1', usecols = ['targtype1_txt'], low_memory = False,
                   na_values = ['.'], dtype = str)
targets = set()
for row in data.itertuples():
    targets.add(row[1])
with open('targets.json', 'w', encoding = 'ISO-8859-1') as f:
    json.dump(list(targets), f, ensure_ascii=False)