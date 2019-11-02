# grand-nutrition
TCD Team Grand Nutrition Application


## Setup backend development environment
** Minimum python 3.5 required to install django version 2.2.6 **

We are using django for our backend

First setup a python3 virtualenv and activate it. After that install using pip
```
pip install django==2.2.6
```

We are using a package for REST

```
pip install djangorestframework==3.10.3
```

Check your django version
```
python3 -m django --version
```

### Setting up database

We are using MySql for our DB. Make sure you have mysql server installled before proceeding

1. Once installed create an empty database
```
CREATE DATABASE grand_app
```

2. Then setup python mysql client
```
pip install mysqlclient
```

3. Now we can run our migrations
```
python manage.py migrate
```

## Start server

Now with our current working directory as grand-nutrition, to start the server
```
cd backend
python3 manage.py runserver
```

Then navigate to http://127.0.0.1:8000/ and you should see that your app is running


## Setting up the front-end project environment

 You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine

 Refer https://nodejs.org/en/ for setting up the node and npm


Check your node version using
```
node -v
```
It should be >=8.10

check your npm version using
```
npm -v
```
It should be >=5.6

After that run
```
cd grand-ui
```
run
### `yarn install`

run

### `yarn start`

Then navigate to http://localhost:3000/ and you should see that your app is running
