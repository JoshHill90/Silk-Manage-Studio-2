from gallery.models import Image, Display, DisplayNotes, DisplayKey
from rest_framework import serializers
import json

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image_link', 'title']


class DisplaySerializer(serializers.ModelSerializer):
    # Override the header_image field to return the image_link
    header_image = serializers.SerializerMethodField()

    def get_header_image(self, obj):
        # If header_image is not None, return the image_link; otherwise, return None
        return obj.header_image.image_link if obj.header_image else None

    class Meta:
        model = Display
        fields = ['name', 'slug', 'header_image']
        
class DisplayNotesSerializer(serializers.ModelSerializer):
    image_id = serializers.SerializerMethodField()

    def get_image_id(self, obj):
        # If header_image is not None, return the image_link; otherwise, return None
        return obj.image.id if obj.image else None
    
    class Meta:
        model = DisplayNotes
        fields = ['id', 'display_key', 'image_id', 'note', 'date']
        
class DisplayKeySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DisplayKey
        fields = ['expire', 'export', 'status', 'random_order', 'restricted']

