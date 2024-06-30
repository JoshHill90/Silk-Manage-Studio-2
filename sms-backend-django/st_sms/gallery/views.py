from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ImageSerializer, DisplaySerializer, TagSerializer, DisplayKeySerializer
from .models import Image, Tag, Display, DisplayKey
from dj_utils.settings_decoder import DecodeSet, EncodeSet
from dj_utils.quick_page import Paginator
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from dj_utils.kekeper import SITE_URLS
from dj_utils.quick_tools import DateFunction
from dj_utils.CFAPI import APICall
from dj_utils.quick_tools import ViewQueryHelper
import json
import secrets


#-----------------------------------------------------------------------------------------------#
# CMS Display Endpoints
#-----------------------------------------------------------------------------------------------#

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_displays(request):
	if request.method == 'GET':
		gallery = Display.objects.all()
		gallery_ser = DisplaySerializer(gallery, many=True)
		data = json.dumps({'galleries': gallery_ser.data})
		return Response(data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_display(request, id):
	if request.method == 'GET':
		gallery = Display.objects.get(id=id)
		images = Image.objects.filter(display_images=gallery).only('id','title', 'tag', 'image_link')
		images_ser =ImageSerializer(images, many=True)
		image_check = lambda : True if gallery.header_image is not None else False
		gallery_data = {
			'id': gallery.id,
			'settings': DecodeSet().display_settings(gallery.settings),
			'name': str(gallery.name),
			'header_image': image_check()
		}
		data = json.dumps({'gallery':gallery_data, 'images': images_ser.data})
		return Response(data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_displays(request):
	if request.method == 'POST':
		json_data = json.loads(request.body)
		name = json_data.get('name')

		display_object = Display.objects.create(name=name)
		display_object.save()

		return Response({'success':'sucess'})     

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_display_keys(request):
	if request.method == 'GET':
		sharedLink = DisplayKey.objects.all()
		shared_link_ser = DisplayKeySerializer(sharedLink, many=True)
		data = json.dumps({'links': shared_link_ser.data})
		return Response(data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_display_key(request, id):
	if request.method == 'GET':
		sharedLink = DisplayKey.objects.get(id=id)
		base_site = str(SITE_URLS.share_link)
		full_url = base_site + f'?gallery={str(sharedLink.display.slug)}&key={sharedLink.key}'
		shared_link_ser = DisplayKeySerializer(sharedLink, many=False)
		data = json.dumps({'link':full_url, 'data': shared_link_ser.data})
		return Response(data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_display_key(request, id):
	if request.method == 'POST':
		sharedLink = DisplayKey.objects.get(id=id)
  
		gallery_perams = json.loads(request.body)
		date_string = int(gallery_perams['expiryDate'])
		random = gallery_perams['random']
		downloads = gallery_perams['downloads']
		views = gallery_perams['views']
  
		expire = str(DateFunction().number_to_days(date_string))

		sharedLink.expire = expire
		sharedLink.random_order = random
		sharedLink.export = downloads
		sharedLink.status = views
		sharedLink.save()
  
		base_site = str(SITE_URLS.share_link)
		full_url = base_site + f'?gallery={str(sharedLink.display.slug)}&key={sharedLink.key}'
		shared_link_ser = DisplayKeySerializer(sharedLink, many=False)
		data = json.dumps({'link':full_url, 'data': shared_link_ser.data})
		return Response(data)



@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_display_key(request, id):
	if request.method == 'DELETE':
		sharedLink = DisplayKey.objects.get(id=id)
		sharedLink.delete()
		return Response({"status": "success"})

#-----------------------------------------------------------------------------------------------#
# display functions
#-----------------------------------------------------------------------------------------------#

# Cleaer all images from gallery
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def clear_gallery_endpoint(request, id):	
	if request.method == 'POST':
		display_object = Display.objects.get(id=id)
		display_object.header_image = None
		display_object.images.clear()
		display_object.save()
		return Response({'sucess': 'sucess'})


# Set header image for gallery
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def header_gallery_endpoint(request, id, image_id):
	if request.method == 'POST':
		display_object = Display.objects.get(id=id)
		header_image = Image.objects.get(id=image_id)
		print(header_image)
		display_object.header_image = header_image
		display_object.save()
		return Response({'sucess': 'sucess'})


# remove images from gallery
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_gallery_endpoint(request, id):
	if request.method == 'POST':
		display_object = Display.objects.get(id=id)
		image_data = json.loads(request.body)['galleryArray']
		selected_images = Image.objects.filter(id__in=image_data)
		for image_index in range(len(selected_images)):
			display_object.images.remove(selected_images[image_index])
		return Response({'sucess': 'sucess'})


# Add images to gallery
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_gallery_endpoint(request, id):
	if request.method == 'POST':
		display_object = Display.objects.get(id=id)
		image_data = json.loads(request.body)['galleryArray']
		selected_images = Image.objects.filter(id__in=image_data)
		for image_index in range(len(selected_images)):
			display_object.images.add(selected_images[image_index])
		return Response({'sucess': 'sucess'})


# Settings update
@api_view(['PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def settings_gallery_endpoint(request, id):
	if request.method == 'PUT':
		display_object = Display.objects.get(id=id)
		print(display_object.settings)
		settings_data = json.loads(request.body)['settingsUpdate']
		print(settings_data)
		new_settings = EncodeSet().display_settings(settings_data)
		display_object.settings = new_settings
		display_object.save()
		print(display_object.settings)
		return Response({'sucess': 'sucess'})


# Create gallery share link 
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def share_gallery_endpoint(request, id):
	if request.method == 'POST':
		gallery_perams = json.loads(request.body)
		date_string = int(gallery_perams['expiryDate'])
		random = gallery_perams['random']
		downloads = gallery_perams['downloads']
		views = gallery_perams['views']
		print(random, downloads, views)
		expire = str(DateFunction().number_to_days(date_string))
		current_display = Display.objects.get(id=id)
		new_key = secrets.token_hex(16)

		DisplayKey.objects.create(
			key=new_key,
			expire=expire,
			display=current_display,
			random_order=random,
			export=downloads,
			status=views,
		)
		base_site = str(SITE_URLS.share_link)
		full_url = base_site + f'?gallery={str(current_display.slug)}&key={new_key}'
		return Response({'url':full_url})

# Delete gallery
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_gallery_endpoint(request, id):
	if request.method == 'DELETE':
		display_object = Display.objects.get(id=id)
		display_object.delete()
		return Response({'sucess': 'sucess'})

#-----------------------------------------------------------------------------------------------#
# CMS Image Endpoints
#-----------------------------------------------------------------------------------------------#

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_images(request, current_page):
	if request.method == 'GET':
		img_object = Image.objects.all()

		img_object = ViewQueryHelper().image_query(request, img_object)
		print(img_object)
		image_p = Paginator(img_object, current_page, 32)
		images = image_p.paginate()
		images_ser = ImageSerializer(images, many=True)
		data = {'images': images_ser.data, 'last_page': image_p.last_page_number()}

		return Response(json.dumps(data))


#-----------------------------------------------------------------------------------------------#
# Image Upload Endpoints
#-----------------------------------------------------------------------------------------------#
@api_view(['GET'])
def upload_token_endpoint(request):
	if request.method == 'GET':
		displays = Display.objects.all().only('id', 'name')
		tags = Tag.objects.all()
		cloudflare_token = APICall().get_batch_token()
		#if 'error' not in cloudflare_token:
		cloudflare_token = str(cloudflare_token)
		front_end_url = 'https://batch.imagedelivery.net/images/v1'
		display_data = DisplaySerializer(displays, many=True)
		tag_data = TagSerializer(tags, many=True)
		post_data = {'cf_token':cloudflare_token,'cf_url': front_end_url, 'galleries': display_data.data, 'tags': tag_data.data, 'silk_id': SITE_URLS.SILKID}

		#else:
		#	e = cloudflare_token
		#	logging.error("error creating token in the upload process: %s", str((e)))
		#	slugified_error_message = slugify(str(e))
		#	return redirect('issue-backend', status=500, error_message=slugified_error_message)
	return Response({'data':post_data})

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_image_endpoint(request):
	if request.method == 'POST':
		
		image_data = json.loads(request.body)['images'] 
		
		imgobj_list = []
		imgecfid_list = []
		for cf_id in image_data:
			#print('upload')
			image_url = f'https://imagedelivery.net/4_y5kVkw2ENjgzV454LjcQ/{cf_id.get('id')}/display'
			imgobj = Image(
				title=cf_id.get('name'),
				image_link=image_url,
				cloudflare_id=cf_id.get('id'),
			)
			print(imgobj.cloudflare_id)
			imgobj_list.append(imgobj)
			imgecfid_list.append(imgobj.cloudflare_id)
		
		Image.objects.bulk_create(imgobj_list)
		set_display = json.loads(request.body)['displays']

		set_tags = json.loads(request.body)['tags']

		new_images = Image.objects.filter(cloudflare_id__in=imgecfid_list)
		tag_list = []
		
		for tag in set_tags:
			print(tag)
			tags_object = Tag.objects.get_or_create(name=tag)
			print(tags_object[0])
			tag_list.append(tags_object[0])
		tags = Tag.objects.filter(name__in=tag_list)
  
		for image in new_images:
			image.tag.add(*tags)
		
		for display in set_display:
			display_instance =  Display.objects.get(name=display)
			display_instance.images.add(*new_images)

		return Response({'sucess': 'sucess'})
