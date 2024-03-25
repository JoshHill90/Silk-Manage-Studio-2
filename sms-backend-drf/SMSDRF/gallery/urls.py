from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('api/v1/all/', views.get_all_displays),
 	path('api/v1/create/', views.create_displays),
  	path('api/v1/<int:id>/', views.get_display),
   	path('api/v1/images/<int:current_page>/', views.get_all_images),
    
    # Gallery Functions
	path('api/v1/<int:id>/clear/', views.clear_gallery_endpoint),
	path('api/v1/<int:id>/remove/', views.remove_gallery_endpoint),
	path('api/v1/<int:id>/header/<int:image_id>/', views.header_gallery_endpoint),
	path('api/v1/<int:id>/add/', views.add_gallery_endpoint),
 	path('api/v1/<int:id>/settings/', views.settings_gallery_endpoint),
	path('api/v1/<int:id>/share/', views.share_gallery_endpoint),
]