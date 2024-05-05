from pathlib import Path
from dotenv import load_dotenv
import os
from decouple import config
from  dj_utils.kekeper import SettingProd, DataBase, SettingKey
load_dotenv()
#-------------------------------------------------------------------------------------------------------#
# dev env settings 
#-------------------------------------------------------------------------------------------------------#

BASE_DIR = Path(__file__).resolve().parent.parent


#-------------------------------------------------------------------------------------------------------#
# Project settings
#-------------------------------------------------------------------------------------------------------#

SECRET_KEY = SettingKey.django_key

DEBUG = True

#ALLOWED_HOSTS = ['test-site-2.silkthreaddev.com', 'www.test-site-2.silkthreaddev.com']
ALLOWED_HOSTS = []

#-------------------------------------------------------------------------------------------------------#
# Base Directory setup
#-------------------------------------------------------------------------------------------------------#


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'gallery',
    'logs',
    'site_app',
    'user_settings',   
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
CORS_ALLOW_ALL_ORIGINS = True
#CSRF_TRUSTED_ORIGINS = ['https://test-site-2.silkthreaddev.com']
ROOT_URLCONF = 'SMSDRF.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'SMSDRF.wsgi.application'

#-------------------------------------------------------------------------------------------------------#
# Database and Autherization
#-------------------------------------------------------------------------------------------------------#

DATABASES = {
    'default': {
        'ENGINE': DataBase.db_engine,
        'NAME': DataBase.db_name,
        'USER': DataBase.db_user,
        'PASSWORD': DataBase.db_key,
        'HOST': DataBase.db_host,
        'PORT':DataBase.db_port, 
        'OPTIONS': {
            'init_command': "SET sql_mode= 'STRICT_TRANS_TABLES'"
        } 
    }
}



#-------------------------------------------------------------------------------------------------------#
# Password validation
#-------------------------------------------------------------------------------------------------------#

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#-------------------------------------------------------------------------------------------------------#
# Time-zone/Language  
#-------------------------------------------------------------------------------------------------------#

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

#-------------------------------------------------------------------------------------------------------#
# Directory and URLS 
#-------------------------------------------------------------------------------------------------------#
STATIC_URL = 'static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# HTTPSS Settings 
SESSION_COOKI_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False

# HSTS Settings
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
