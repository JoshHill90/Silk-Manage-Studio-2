from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ImageSerializer, DisplaySerializer
from .models import Image, Tag, Display, DisplayKey
from SMSDRF.env.app_Logic.untility.settings_decoder import DecodeSet
from django.core.paginator import Paginator

import json


#-----------------------------------------------------------------------------------------------#
# CMS Display Endpoints
#-----------------------------------------------------------------------------------------------#

@api_view(['GET'])
def get_all_displays(request):
	if request.method == 'GET':
		gallery = Display.objects.all()
		gallery_ser = DisplaySerializer(gallery, many=True)
		data = json.dumps({'galleries': gallery_ser.data})
		return Response(data)

@api_view(['GET'])
def get_display(request, id):
	if request.method == 'GET':
		gallery = Display.objects.get(id=id)
		images = Image.objects.filter(display_images=gallery).only('id','title', 'tag', 'image_link')
		images_ser =ImageSerializer(images, many=True)
		image_check = lambda has_image: True if gallery.header_image is not None else False
		gallery_data = {
			'id': gallery.id,
			'settings': DecodeSet().display_settings(gallery.settings),
			'name': str(gallery.name),
			'header_image': image_check(gallery.header_image)
		}
		data = json.dumps({'gallery':gallery_data, 'images': images_ser.data})
		return Response(data)

@api_view(['POST'])
def create_displays(request):
	if request.method == 'POST':
		json_data = json.loads(request.body)
		name = json_data.get('name')

		display_object = Display.objects.create(name=name)
		display_object.save()

		return Response({'success':'sucess'})


#-----------------------------------------------------------------------------------------------#
# CMS Image Endpoints
#-----------------------------------------------------------------------------------------------#

@api_view(['GET'])
def get_all_images(request):
	if request.method == 'GET':

		image_p = Paginator(Image.objects.all(), 50)
		last_page = image_p.num_pages
		page = request.GET.get('page')
		image_sets = image_p.get_page(page)
		images_ser = ImageSerializer(image_sets, many=True)
  
		data = json.dumps({'images': images_ser.data})
		return Response(data)

