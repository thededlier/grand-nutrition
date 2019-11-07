# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import pickle
from recsys import *


def generate_recomendation_list(user_id):
    interactions = pickle.load(open("int.pkl", 'rb'))
    user_dict = pickle.load(open("user_dict.pkl", 'rb'))
    food_dict = pickle.load(open("food_dict.pkl", 'rb'))
    
    loaded_model = pickle.load(open("model.pkl", 'rb'))
    rec = sample_recommendation_user(model = loaded_model,interactions = interactions,user_id = user_id, user_dict = user_dict, item_dict = food_dict,threshold = 0,nrec_items = 3, show = False)
    #print(rec)
    
    return rec;
