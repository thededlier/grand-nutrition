# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))


def testindex(request):
    return HttpResponse("Directing you here now...")


def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def result(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s" % question_id)
