import pandas as pd
import numpy as np
import os
import sqlalchemy as db

from sklearn.preprocessing import MinMaxScaler

print("Executing in ", os.path.abspath(__file__))

print("Loading data")
columns = ['code', 'product_name', 'cholesterol_100g', 'sugars_100g', 'energy_100g', 'proteins_100g', 'carbohydrates_100g']

# Select encoding to match database encoding
food_data = pd.read_csv('/home/rohan/Documents/grand-nutrition/data/en.openfoodfacts.org.products.tsv', sep='\t', nrows=300, usecols = columns, encoding="latin-1")

food_data.fillna(food_data.median(), inplace=True)

# Start preprocessing
print("Preprocessing")

food_data.rename(columns = { 'product_name': 'name', 'code': 'id' }, inplace = True)

# Removing outliers
print("Removing outliers")
food_data = food_data[food_data['proteins_100g'] < 20]
food_data = food_data[food_data['carbohydrates_100g'] > 20]

# Scaling data
print("Scaling data")
mms = MinMaxScaler()
food_data[['carbohydrates_100g', 'proteins_100g']] = mms.fit_transform(food_data[['carbohydrates_100g', 'proteins_100g']])
food_data['mean_pro_car'] = (food_data['proteins_100g'] + food_data['carbohydrates_100g']) / 2

# Creating user goal and activity mapping
print("Building user goal and activity map")

food_data['user_goal_map'] = np.nan
food_data['activity_map'] = np.nan

# Ranges
# 0.0 - 0.4
# 0.4 - 0.5
# 0.5 - 0.8

# 0 - 1300
# 1300 - 1750
# 1750 - 2200
# 2200 - 4000

for i in food_data.index:
    if food_data['mean_pro_car'][i] < 0.4:
        food_data['user_goal_map'][i] = 'lose'
    elif food_data['mean_pro_car'][i] < 0.5:
        food_data['user_goal_map'][i] = 'maintain'
    else:
        food_data['user_goal_map'][i] = 'gain'

    if food_data['energy_100g'][i] < 1300:
        food_data['activity_map'][i] = 'sedantry'
    elif food_data['energy_100g'][i] < 1750:
        food_data['activity_map'][i] = 'lightly_active'
    elif food_data['energy_100g'][i] < 2200:
        food_data['activity_map'][i] = 'moderately_active'
    else:
        food_data['activity_map'][i] = 'very_active'

food_data = food_data.round(4)
print("generated food data")
food_data.to_csv("../food_data.csv")
print(food_data.head())
# Uplifting to sql
print("Starting sql uplift")
engine = db.create_engine('mysql+mysqldb://grand_app:grand_app@localhost:3306/grand_app')
food_data.to_sql('food_item', engine, if_exists='replace', index=False)
