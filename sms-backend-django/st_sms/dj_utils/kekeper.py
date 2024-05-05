import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).resolve().parent		
ven = current_dir / "./env/.env/"
load_dotenv(ven)

class EmailKeys:

	host = os.getenv('API_ST_EMAIL_HOST')
	send_email = os.getenv('API_ST_MANAGER_EMAIL')
	send_passwd = os.getenv('API_ST_EMAIL_PASSWORD')
	port = os.getenv('API_ST_EMAIL_PORT')
	
	owner_email = os.getenv('API_ST_EMAIL_CONTACT')
  
class SettingKey:

	django_key = os.getenv('API_ST_DJANGO_KEY')

class SettingProd:
	# Debug
	django_debug = os.getenv('API_ST_DJANGO_DEBUG_PROD')
	# allowed host
	django_host_1 = os.getenv('API_ST_DJANGO_HOSTS_PROD_1')
	django_host_2 = os.getenv('API_ST_DJANGO_HOSTS_PROD_2')
	django_host_3 = os.getenv('API_ST_DJANGO_HOSTS_PROD_3')
	django_host_ip = os.getenv('API_ST_DJANGO_HOSTS_PROD_IP')
	
	# trusted Org
	db_wl1 = os.getenv('API_ST_DJANGO_WHITELIST_Client_IP')
	db_wl2 = os.getenv('API_ST_DJANGO_WHITELIST_DNS_COM')
	db_wl3 = os.getenv('API_ST_DJANGO_WHITELIST_WWW_COM')
	db_wl4 = os.getenv('API_ST_DJANGO_WHITELIST_DNS_DEV')
	db_wl5 = os.getenv('API_ST_DJANGO_WHITELIST_WWW_DEV')
 
class SettingDev:

	django_debug = os.getenv('API_ST_DJANGO_DEBUG_DEV')

class DataBase:
	db_engine = os.getenv('API_ST_DB_ENGINE')
	db_name = os.getenv('API_ST_DB_NAME')
	db_user = os.getenv('API_ST_DB_USER')
	db_key = os.getenv('API_ST_DB_PASSWORD')
	db_host = os.getenv('API_ST_DB_HOST')
	db_port = os.getenv('API_ST_DB_PORT')
 
class CFCDN:
    key = os.getenv('API_ST_API_KEY')
    name = os.getenv('API_ST_CF_ACCESS_NAME')
    account_id = os.getenv('API_ST_ACCOUNT_ID')
    
class CFR2:
	token = os.getenv('API_ST_CFR2_TOKEN')
	account_id = os.getenv('API_ST_CFR2_ACC_ID')
	key = os.getenv('API_ST_CFR2_ACC_KEY')
	endpoint = os.getenv('API_ST_CFR2_ENDPOINT')
	bucket = os.getenv('API_ST_CFR2_BUCKET')
 
class SITE_URLS:
    share_link = os.getenv('API_ST_SHARE_GALLERY')
    base_link = os.getenv('API_ST_BASESITE')
    SILKID = os.getenv('API_ST_SILKID')
    home_url = os.getenv('API_ST_HOMESITE')

