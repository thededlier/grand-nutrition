from django.db import models

# Create your models here.
class AppUser(models.Model):
    name = models.CharField(max_length = 128)
    username = models.CharField(max_length = 128)
    password = models.CharField(max_length = 128)

class AppUserProfile(models.Model):
    app_user = models.OneToOneField(AppUser, on_delete = models.CASCADE)
    dob = models.DateField()
    gender = models.IntegerField() # Male = 0, Female = 1, Other = 2
