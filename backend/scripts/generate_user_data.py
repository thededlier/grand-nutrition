import pandas as pd
import random
import os
from faker import Faker
import pickle

faker = Faker()

food_data = pd.read_csv('../../notebook/data/en.openfoodfacts.org.products.tsv', sep='\t', nrows=2000, usecols = ['code'])

user_columns = ['id', 'name', 'username', 'password']
user_data = pd.DataFrame(columns=user_columns)

user_profile_columns = ['id', 'gender', 'weight', 'height', 'activityLevel', 'usersGoal']
user_profile_data = pd.DataFrame(columns=user_profile_columns)

user_food_history_columns = ['id', 'user_id', 'food_id', 'food_time', 'rating']
user_food_history_data = pd.DataFrame(columns=user_food_history_columns)

history_counter = 1

print("Generating data")

for id in range(1, 5000):
    print('Generating user data for id ', id)
    name = faker.name()
    username = name
    password = name

    user_data.append({ 'id': id, 'name': name , 'username': username, 'password': password }, ignore_index=True)

    gender = random.choice([0, 1, 2])
    weight = random.randint(50, 120)  # In kgs
    height = random.randint(120, 220) # In cm
    usersGoal = random.choice([0, 1, 2])
    activityLevel = random.choice([0, 1, 2, 3])

    user_profile_data.append({
        'id': id,
        'gender': gender,
        'weight': weight,
        'height': height,
        'usersGoal': usersGoal,
        'activityLevel': activityLevel
    }, ignore_index=True)

    for j in range(random.randint(3,26)):
        random_food = food_data.sample(n=3)
        breakfast = random_food.iloc[0]
        lunch = random_food.iloc[1]
        dinner = random_food.iloc[2]
        user_food_history_data = user_food_history_data.append({
            'id': history_counter,
            'user_id': id,
            'food_id': breakfast['code'],
            'food_time': 'breakfast',
            'rating': random.choice([0, 1])
        }, ignore_index=True)

        history_counter += 1

        user_food_history_data = user_food_history_data.append({
            'id': history_counter,
            'user_id': id,
            'food_id': lunch['code'],
            'food_time': 'lunch',
            'rating': random.choice([0, 1]),
        }, ignore_index=True)

        history_counter += 1

        user_food_history_data = user_food_history_data.append({
            'id': history_counter,
            'user_id': id,
            'food_id': dinner['code'],
            'food_time': 'dinner',
            'rating': random.choice([0, 1]),
        }, ignore_index=True)

        history_counter += 1

print(user_data.head())
print(user_profile_data.head())
print(user_food_history_data.head())

print('Saving at ', os.getcwd())

f = open('user_data.pkl', 'wb')
pickle.dump(user_data, f)
f.close()

f = open('user_profile_data.pkl', 'wb')
pickle.dump(user_profile_data, f)
f.close()

f = open('user_food_history_data.pkl', 'wb')
pickle.dump(user_food_history_data, f)
f.close()

# user_data.to_csv('./user_data.csv', ignore_index = True)
# user_profile_data.to_csv('./user_data.csv', ignore_index = True)
# user_food_history_data.to_csv('./user_data.csv', ignore_index = True)

print('Done!')
