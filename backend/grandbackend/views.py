from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from grandbackend.models import AppUser, AppUserProfile, FoodItem, UserFoodHistory
from grandbackend.serializers import AppUserSerializer, AppUserProfileSerializer, FoodItemSerializer, UserFoodHistorySerializer
from .recsys import *
import pickle
import os

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

@api_view(['GET', 'POST'])
def app_user_profile_details(request, user_id):
    try:
        app_user_profile = AppUserProfile.objects.get(app_user_id=user_id)
    except AppUserProfile.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = AppUserProfileSerializer(app_user_profile)
        return JsonResponse(serializer.data, status=201)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AppUserProfileSerializer(app_user_profile, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    else:
        return HttpResponse(status=500)

@api_view(['POST'])
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

@api_view(['GET'])
def food_item_details(request, pk):
    """
    Get food data for a particular item
    """
    try:
        food_item = FoodItem.objects.get(pk=str(pk))
    except FoodItem.DoesNotExist:
        return HttpResponse(status=404)

    serializer = FoodItemSerializer(food_item)
    return JsonResponse(serializer.data)

@api_view(['GET'])
def food_recommend(request, user_id):
    """
    Gives user recommendation
    """

    dirname = os.path.dirname(__file__)

    interactions = pickle.load(open(os.path.join(dirname, '../user-models/interactions.pkl'), 'rb'))
    user_dict = pickle.load(open(os.path.join(dirname, '../user-models/user_dict.pkl'), 'rb'))
    food_dict = pickle.load(open(os.path.join(dirname, "../user-models/food_dict.pkl"), 'rb'))
    loaded_model = pickle.load(open(os.path.join(dirname, "../user-models/model.pkl"), 'rb'))

    # Returns ids [food_1, food_2, ...]
    rec = sample_recommendation_user(
        model = loaded_model,
        interactions = interactions,
        user_id = user_id,
        user_dict = user_dict,
        item_dict = food_dict,
        threshold = 0,
        nrec_items = 5,
        show = False
    )

    try:
        food_item = FoodItem.objects.filter(id__in=rec)
    except:
        return HttpResponse(status=500)

    serializer = FoodItemSerializer(food_item, many = True)
    return JsonResponse(serializer.data, safe = False)

@api_view(['GET'])
def food_history(request, user_id):
    """
    Gives the users food history
    """
    try:
        food_history = UserFoodHistory.objects.filter(user_id__in=[user_id])
    except Exception as e:
        return JsonResponse({ 'error': e }, status = 400)

    history_serializer = UserFoodHistorySerializer(food_history, many=True)

    food_ids = list()
    for food in food_history:
        food_ids.append(str(food.food_id))

    food_items = FoodItem.objects.filter(id__in=food_ids)[:5]
    food_serializer = FoodItemSerializer(food_items, many=True)
    return JsonResponse({ 'history': history_serializer.data, 'food_items': food_serializer.data}, safe = False)
