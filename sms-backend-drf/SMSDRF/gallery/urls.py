from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('api/v1/all/', views.get_all_displays),
 	path('api/v1/create/', views.create_displays),
  	path('api/v1/<int:id>/', views.get_display),
   	path('api/v1/images/', views.get_all_images),
]