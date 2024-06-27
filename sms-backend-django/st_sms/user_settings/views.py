from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, TokenSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
import json
from logs.LTBE import logging
from dj_utils.CFTS import validate_turnstile_token
from dj_utils.kekeper import CFTS
## auth imports
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login(request):
    print()

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = get_object_or_404(User, username=data.get('Username'))
            if not user.check_password(data.get('Password')):
                return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
            token, created  = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(instance=user)
            return Response({'token': token.key, 'user': serializer.data})
        # if the logic fails
        except KeyError:
            error_logged = f"Error: Required data not found in request: {data}"
            logging.error(error_logged)
            return Response({'error': error_logged}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            error_logged = f"Error: User does not exist for username: {data.get('Username')}"
            logging.error(error_logged)
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            error_logged = f"Error in login: {e}"
            logging.error(error_logged)
            return Response({'error': error_logged}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        
        return Response(resp, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()

                # sets users' password as a hash password
                user.set_password(request.data['password'])
                user.save()
                token = Token.objects.create(user=user)
                return Response({'token': token.key, 'user': serializer.data})
            else:
                return Response({'error': 'error not valid info'})
        except KeyError:
            error_logged = f"Error: Required data not found in request: {request.data}"
            logging.error(error_logged)
            return Response({'error': error_logged}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            error_logged = f"Error in signup process: {e}"
            logging.error(error_logged)
            return Response({'error': error_logged}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # not a patch request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        return Response(resp, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == 'POST':
        try:
            token = Token.objects.get(key=request.auth.key)
            token.delete()
            return Response({'message': 'Successfully logged out.'})
        # if token does not exist
        except Token.DoesNotExist:
            logging.error(f"Token does not exist. Request info: {request}")
            return Response({'error': 'Token does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        # if there was an error in the login logic or process
        except Exception as e:
            logging.error(f"Error in logging out: {e}")
            return Response({'error': 'An error occurred while logging out.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # not a patch request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        return Response(resp)

@api_view(['GET'])
#check token and session id
@authentication_classes([SessionAuthentication, TokenAuthentication])
# checks if the user is auth
@permission_classes([IsAuthenticated])
def testEx(request):
    # if checks are passed the user data will show in under request as an object ie request.user
    return Response(f"passed!${request.user}")


# Bot check
@api_view(['POST'])
def cloudFlareTurnStile(request):
    if request.method == 'POST':
        try:
            url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
            data = json.loads(request.body)
            print(data)
            #remoteip = request.headers.get('CF-Connecting-IP')
            secretKey = CFTS.turnstlie 
            response = data.get("cf-turnstile-response")
            remoteip = request.META.get('HTTP_CF_CONNECTING_IP', request.META.get('REMOTE_ADDR'))
            validation = validate_turnstile_token(remoteip, response, secretKey)
            if validation != True:
                error_logged = f"Error in validation - CF"
                logging.error(error_logged)
                return Response({'Error in validation': error_logged}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            return Response({'status': "success"}, status=200)

        except Exception as e:
            error_logged = f"Error in validation {e}"
            logging.error(error_logged)
            return Response({'Error in validation': error_logged}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # not a patch request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        return Response(resp, status=status.HTTP_500_INTERNAL_SERVER_ERROR)