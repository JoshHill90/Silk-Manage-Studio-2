from django.contrib import admin
from .models import Contact
from gallery.models import Image, Display, Tag, DisplayKey
#from blog.models import Blog

#admin.site.register(Blog)
admin.site.register(Tag)
admin.site.register(Image)
admin.site.register(Contact)
admin.site.register(DisplayKey)
admin.site.register(Display)
