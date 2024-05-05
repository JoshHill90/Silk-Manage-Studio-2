from django.contrib import admin
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('v1/gallery/<slug:slug>/', views.public_image_by_gallery_endpoint),
    path('v1/gallery/', views.public_galleries_endpoint),
    path('v1/private/<slug:slug>/<slug:key>/', views.private_image_by_gallery_endpoint),
    path('v1/private/<slug:slug>/<slug:key>/review/', views.private_review_submit_endpoint),
    path('v1/private/<slug:slug>/<slug:key>/notes/', views.private_notes_submit_endpoint),
    path('v1/booking/', views.booking_form),
]