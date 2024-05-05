from typing import Any
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, TemplateView
from django.db.models import Q
from django.conf import settings
from django.urls import reverse_lazy
from django.core.exceptions import ObjectDoesNotExist
from gallery.models import Image, Display, DisplayKey, DisplayNotes, genHex
from site_app.models import Contact
from dj_utils.MailerDJ import AutoReply
import json
from logs.LTBE import logging
from dj_utils.settings_decoder import CheckEncodeSet
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ImageSerializer, DisplaySerializer, DisplayNotesSerializer, DisplayKeySerializer
import datetime

smtp_request = AutoReply()
def index_images(request):
	dicts = {'hello':'hi'}
	return Response(dicts)
#-----------------------------------------------------------------------------------------------------------#
#
# functions
#
#-----------------------------------------------------------------------------------------------------------#


def append_cloundflare_id(cf_id, image_id, type_image):
	update_image_record = Image.objects.get(id=image_id)
	
	image_url = 'https://imagedelivery.net/4_y5kVkw2ENjgzV454LjcQ/' + cf_id +'/display'
	update_image_record.image_link = image_url
	update_image_record.save()
#-------------------------------------------------------------------------------------------------------#
# settingskeys
#------------------------------------------------------=-------------------------------------------------#
#takes char from settings string. 
settings_value = CheckEncodeSet().display_settings
#-------------------------------------------------------------------------------------------------------#
# main site image calls
#------------------------------------------------------=-------------------------------------------------#

@api_view(['GET'])
def public_image_by_gallery_endpoint(request, slug):
	
	if request.method == 'GET':
		
		try:
			display = Display.objects.get(slug=slug)
			check = settings_value(display.settings[0:1])
			if not check:
				return Response(data={'error': 'This action is not permitted. Please review the Gallery settings.'}, status=403)

			serialized_display = DisplaySerializer(display)
			all_images = Image.objects.filter(display_images=display.id).only('image_link')
			serialized_image = ImageSerializer(all_images, many=True)

			return Response(data={'images': serialized_image.data, 'gallery': serialized_display.data})
		
		except ObjectDoesNotExist:
			return Response(data={'error': 'Display not found.'}, status=404)
		
		except Exception as e:
			logging.error(f"An error occurred: {str(e)}")
			return Response(data={'error': 'An error occurred while processing your request.'}, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

@api_view(['GET'])
def public_galleries_endpoint(request):
	if request.method == 'GET':
		try:
			display = Display.objects.all()
			display_list = []
			for gal in display:
				check = settings_value(gal.settings[1:2])
				if check == True:
					display_list.append(gal)
			serailized_display = DisplaySerializer(display_list, many=True)
			return Response(data=serailized_display.data)

		except ObjectDoesNotExist:
			return Response(data={'error': 'Galleries do not exisit.'}, status=404)
		
		except Exception as e:
			logging.error(f"An error occurred: {str(e)}")
			return Response(data={'error': 'An error occurred while processing your request.'}, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

@api_view(['GET'])
def private_image_by_gallery_endpoint(request, slug, key):
	
	if request.method == 'GET':
		today = datetime.datetime.now().date()
		gallery_token = DisplayKey.objects.get(key=key)

		if not gallery_token or gallery_token.expire < today:
			return Response(data={'error': 'This action is not permitted. This gallery is expired.'}, status=403)

		try:
			display = Display.objects.get(slug=slug)
			all_images = Image.objects.filter(display_images=display.id).only('id', 'image_link', 'title')
			notes = DisplayNotes.objects.filter(display_key=gallery_token)

			serialized_display = DisplaySerializer(display)
			serialized_image = ImageSerializer(all_images, many=True)
			serialized_notes = DisplayNotesSerializer(notes, many=True)
			serialized_key = DisplayKeySerializer(gallery_token, many=False)
			return Response(
				data={
					'images': serialized_image.data, 
					'gallery': serialized_display.data, 
					'notes': serialized_notes.data,
					'gallery_token': serialized_key.data
				}
			)
		
		except ObjectDoesNotExist:
			return Response(data={'error': 'Display not found.'}, status=404)
		
		except Exception as e:
			logging.error(f"An error occurred: {str(e)}")
			return Response(data={'error': 'An error occurred while processing your request.'}, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

@api_view(['POST'])
def private_review_submit_endpoint(request, slug, key):
	
	if request.method == 'POST':
     
		gallery_token = DisplayKey.objects.get(key=key)
		today = datetime.datetime.now().date()

		if not gallery_token or gallery_token.expire < today:
			return Response(data={'error': 'This action is not permitted. This gallery is expired.'}, status=403)
		
		try:
			display_object = Display.objects.get(slug=slug)
			image_objects = Image.objects.filter(display_images=display_object.id)
			old_list = []
			new_list = []
			image_ids = json.loads(request.body)
			selected_images = image_objects.filter(id__in=image_ids)
			for og_image_index in range(len(image_objects)):
				old_list.append(image_objects[og_image_index].title)

			display_object.images.clear()
  
			for image_index in range(len(selected_images)):
				display_object.images.add(selected_images[image_index])
				new_list.append(selected_images[image_index].title)
				gallery_token.status = 'submitted'

			gallery_token.save()
			smtp_request.review_submitted(display_object, old_list, new_list)

			return Response(data={'result':'success'}, status=200)
		
		except ObjectDoesNotExist:
			return Response(data={'error': 'Display not found.'}, status=404)
		
		except Exception as e:
			logging.error(f"An error occurred: {str(e)}")
			return Response(data={'error': 'An error occurred while processing your request.'}, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

@api_view(['POST'])
def private_notes_submit_endpoint(request, slug, key):

	if request.method == 'POST':
		today = datetime.datetime.now().date()
		gallery_token = DisplayKey.objects.get(key=key)

		if not gallery_token or gallery_token.expire < today:
			return Response(data={'error': 'This action is not permitted. Please review the Gallery settings.'}, status=403)
		try:
			image_id = json.loads(request.body)['imageID']
			notes_posted = json.loads(request.body)['note']
			noted_image = Image.objects.get(id=image_id)
			posted_note = DisplayNotes.objects.create(
				uni=genHex(),
				image=noted_image,
				note=str(notes_posted),
				display_key=gallery_token
			)
			posted_note.save()
			new_note = DisplayNotes.objects.get(uni=posted_note.uni)
			serialized_notes = DisplayNotesSerializer(new_note, many=False)

			return Response(data=serialized_notes.data, status=200)
		
		except ObjectDoesNotExist:
			return Response(data={'error': 'Display not found.'}, status=404)
		
		except Exception as e:
			logging.error(f"An error occurred: {str(e)}")
			return Response(data={'error': 'An error occurred while processing your request.'}, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

				
#-------------------------------------------------------------------------------------------------------#
# index - booking - galler - about 
#-------------------------------------------------------------------------------------------------------#

@api_view(['POST'])
def booking_form(request):
	if request.method == 'POST':
		contact_object = Contact.objects.all()
		data = json.loads(request.body)
		formData  = data.get('data')
		
		name = formData.get('name')
		email = formData.get('email')
		subject = formData.get('subject')
		body = formData.get('body_text')
		contact_object.create(
			name=name,
			email=email,
			subject=subject,
			body=body
		)

		email_sent = smtp_request.contact_request(email, name, subject, request.user.first_name)
		notice_sent = smtp_request.contact_alart(email, name, subject, body)
		if email_sent == 'success' and notice_sent == 'success':
			resp = {'returned':'success'}
			
			return Response(resp)
		else:
			e = 'email-sent ', notice_sent, 'notice-sent ', notice_sent
			logging.error("Client Invite Error: %s", str((e)))
			
			resp = {'returned':'failed'}
			
			return Response(resp, status=500)
	else:
		logging.error(f"Incorrect request method: {str(request.method)}")
		return Response(data={'error': 'Incorrect request method.'}, status=405)

	


