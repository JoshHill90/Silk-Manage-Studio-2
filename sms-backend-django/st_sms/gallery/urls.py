from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
	path('api/v1/all/', views.get_all_displays),
 	path('api/v1/create/', views.create_displays),
  	path('api/v1/<int:id>/', views.get_display),
   	path('api/v1/images/<int:current_page>/', views.get_all_images),
	path('api/v1/shared-links/', views.get_all_display_keys),
    
    # Gallery Functions
	path('api/v1/<int:id>/clear/', views.clear_gallery_endpoint),
	path('api/v1/<int:id>/remove/', views.remove_gallery_endpoint),
	path('api/v1/<int:id>/header/<int:image_id>/', views.header_gallery_endpoint),
	path('api/v1/<int:id>/add/', views.add_gallery_endpoint),
 	path('api/v1/<int:id>/settings/', views.settings_gallery_endpoint),
	path('api/v1/<int:id>/share/', views.share_gallery_endpoint),
 	path('api/v1/<int:id>/delete/', views.delete_gallery_endpoint),
  
	# Share Link Functions
	path('api/v1/shared-links/<int:id>/', views.get_display_key),
	path('api/v1/shared-links/<int:id>/update/', views.update_display_key),
	path('api/v1/shared-links/<int:id>/delete/', views.delete_display_key),
 
   	path('api/v1/Batch-token/', views.upload_token_endpoint),
    path('api/v1/image/create/', views.upload_image_endpoint),
]