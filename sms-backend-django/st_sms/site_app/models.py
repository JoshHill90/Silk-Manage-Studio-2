from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=255)
    subject = models.CharField(max_length=255)
    body = models.TextField(max_length=800)

    def __str__(self):
        return f'Name: {self.name} - Subject: {self.subject}'
