import pickle
import pandas as pd
from recsys import *

user_food_history_data = pickle.load(open("user_food_history_data.pkl", 'rb'))

print("User food history")
print(user_food_history_data.head())

interactions = create_interaction_matrix(df = user_food_history_data,
                                         user_col = 'user_id',
                                         item_col = 'food_id',
                                         rating_col = 'rating')

print("Interaction Matrix")
print(interactions.head())

f = open("interactions.pkl","wb")
pickle.dump(interactions,f)
f.close()

mf_model = runMF(interactions = interactions,
                 n_components = 30,
                 loss = 'warp',
                 epoch = 30,
                 n_jobs = 4)

print('Exporting model')
f = open("model.pkl","wb")
pickle.dump(mf_model,f)
f.close()

print("Creating dictionaries")
columns = ['code', 'url', 'product_name', 'cholesterol_100g', 'sugars_100g', 'energy_100g']
food_data = pd.read_csv('../../notebook/data/en.openfoodfacts.org.products.tsv', sep='\t', nrows=2000, usecols = columns)
user_dict = create_user_dict(interactions=interactions)
food_dict = create_item_dict(df = food_data,
                               id_col = 'code',
                               name_col = 'product_name')

f = open("user_dict.pkl","wb")
pickle.dump(user_dict,f)
f.close()

f = open("food_dict.pkl","wb")
pickle.dump(food_dict,f)
f.close()

print('Done!')
