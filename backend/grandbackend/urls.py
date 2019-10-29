from django.urls import path

from . import views

urlpatterns = [
    path('app_user/<int:pk>/', views.app_user_details),
    path('app_user/new/', views.app_user_insert)
]
