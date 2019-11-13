from rest_framework import serializers
from grandbackend.models import AppUser, AppUserProfile, FoodItem

class AppUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUserProfile
        fields = ['dob', 'gender', 'weight', 'height', 'activityLevel', 'usersGoal']

    def create(self, validated_data):
        return AppUserProfile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        [setattr(instance, k, v) for k, v in validated_data.items()]
        instance.save()
        return instance

class AppUserSerializer(serializers.ModelSerializer):
    appuserprofile = AppUserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = AppUser
        fields = ['id', 'name', 'username', 'password', 'appuserprofile']

    def create(self, validated_data):
        return AppUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'energy_100g', 'cholesterol_100g', 'carbohydrates_100g', 'sugars_100g', 'proteins_100g', 'user_goal_map', 'activity_map']
