from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from grandbackend.models import AppUser, AppUserProfile
from grandbackend.serializers import AppUserSerializer, AppUserProfileSerializer

@api_view(['POST', 'GET', 'DELETE'])
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

@api_view(['POST'])
def app_user_profile_create(request, user_id):
    """
    Create new user profile
    """

    try:
        app_user = AppUser.objects.get(pk=user_id)
    except AppUser.DoesNotExist:
        return HttpResponse(status=404)

    try:
        app_user_profile = AppUserProfile.objects.get(app_user_id=user_id)
    except AppUserProfile.DoesNotExist:
        data = JSONParser().parse(request)
        serializer = AppUserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save(app_user = app_user)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

    return JsonResponse({ 'error': 'User profile already exists' }, status=404)

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
