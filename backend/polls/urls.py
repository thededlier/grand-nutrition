from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.testindex, name='testindex'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.result, name='results'),
    path('<int:question_id>/votes/', views.vote, name='votes'),
]