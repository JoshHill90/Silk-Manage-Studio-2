from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('site_app.urls')),
    path('user/', include('django.contrib.auth.urls')),
    path('user/', include('user_settings.urls')),
    path('gallery/', include('gallery.urls')),

] 