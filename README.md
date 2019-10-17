# grand-nutrition
TCD Team Grand Nutrition Application


## Setup backend development environment
** Minimum python 3.5 required to install django version 2.2.6 **

We are using django for our backend

First setup a python3 virtualenv and activate it. After that install using pip
```
pip install django==2.2.6
```

Check your django version
```
python3 -m django --version
```

Now with our current working directory as grand-nutrition, to start the server
```
cd backend
python3 manage.py runserver
```

Then navigate to http://127.0.0.1:8000/ and you should see that your app is running
