# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello World. You're at the polls index")


def testindex(request):
    return HttpResponse("Directing you here now...")
