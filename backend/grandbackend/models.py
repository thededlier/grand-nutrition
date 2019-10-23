from django.db import models

# Create your models here.
class AppUser(models.Model):
    name = models.CharField(max_length = 128)
    username = models.CharField(max_length = 128)
    password = models.CharField(max_length = 128)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
