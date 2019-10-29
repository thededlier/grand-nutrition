from rest_framework import serializers
from grandbackend.models import AppUser, AppUserProfile

class AppUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUserProfile
        fields = ['dob', 'gender']

class AppUserSerializer(serializers.ModelSerializer):
    appuserprofile = AppUserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = AppUser
        fields = ['id', 'name', 'username', 'appuserprofile']

    def create(self, validated_data):
        return AppUser.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
