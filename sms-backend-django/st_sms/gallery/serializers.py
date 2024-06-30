from rest_framework import serializers
from .models import Image, Tag, Display, DisplayKey

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

  

class DisplaySerializer(serializers.ModelSerializer):
    # Override the header_image field to return the image_link
    header_image = serializers.SerializerMethodField()

    def get_header_image(self, obj):
        # If header_image is not None, return the image_link; otherwise, return None
        return obj.header_image.image_link if obj.header_image else None
    class Meta:
        model = Display
        fields = ['id', 'name', 'images', 'settings', 'header_image', "slug"]

class ImageSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)
    class Meta:
        model = Image
        fields = ['id','title', 'tag', 'image_link',]

class DisplayKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = DisplayKey
        fields = ["id", "expire" ,"display" ,"export" ,"status" ,"random_order" ]
