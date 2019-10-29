from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from grandbackend.models import AppUser
from grandbackend.serializers import AppUserSerializer

def app_user_details(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        app_user = AppUser.objects.get(pk=pk)
    except AppUser.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = AppUserSerializer(app_user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AppUserSerializer(app_user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        app_user.delete()
        return HttpResponse(status=204)


def app_user_insert(request):
    """
    Insert new user into database.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AppUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
