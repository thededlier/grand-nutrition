import pandas as pd
import numpy as np
import os
import pickle

import sqlalchemy as db

user_data = pickle.load(open('user_data.pkl', 'rb'))
user_profile_data = pickle.load(open('user_profile_data.pkl', 'rb'))
user_food_history_data = pickle.load(open("user_food_history_data.pkl", 'rb'))
user_profile_data['dob'] = '1994-10-02'
user_profile_data.rename(columns={'id': 'app_user_id'}, inplace=True)

print(user_data.head())
print(user_profile_data.head())
print(user_food_history_data.head())

print("Starting sql uplift")
engine = db.create_engine('mysql+mysqldb://grand_app:grand_app@localhost:3306/grand_app')
user_data.to_sql('grandbackend_appuser', engine, if_exists='append', index=False)
user_profile_data.to_sql('grandbackend_appuserprofile', engine, if_exists='append', index=False)
user_food_history_data.to_sql('grandbackend_userfoodhistory', engine, if_exists='replace', index=False)
