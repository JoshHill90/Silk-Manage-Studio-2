from rest_framework import serializers
from .models import Image, Tag, Display

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

  

class DisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Display
        fields = ['id', 'name', 'images', 'settings', 'header_image']

class ImageSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)
    class Meta:
        model = Image
        fields = ['id','title', 'tag', 'image_link',]
