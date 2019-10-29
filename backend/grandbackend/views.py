from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from grandbackend.models import AppUser
from grandbackend.serializers import AppUserSerializer

def app_user_details(request, pk):
    try:
        app_user = AppUser.objects.get(pk=pk)
    except AppUser.DoesNotExist:
        return HttpResponse(status=404)

    # Read
    if request.method == 'GET':
        serializer = AppUserSerializer(app_user)
        return JsonResponse(serializer.data)

    # Update
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AppUserSerializer(app_user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    # Delete
    elif request.method == 'DELETE':
        app_user.delete()
        return HttpResponse(status=204)
