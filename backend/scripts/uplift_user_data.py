import pandas as pd
import numpy as np
import os
import pickle

import sqlalchemy as db

user_data = pickle.load(open('user_data.pkl', 'rb'))
user_profile_data = pickle.load(open('user_profile_data.pkl', 'rb'))
user_food_history_data = pickle.load(open("user_food_history_data.pkl", 'rb'))

print(user_profile_data.head())
