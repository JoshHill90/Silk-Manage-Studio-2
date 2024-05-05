import boto3
from pathlib import Path

import json
import io

from .kekeper import CFR2

class CloudflareR2API:
    
    def __init__(self):


        self.CFR2_TOKEN = CFR2.token
        self.CFR2_ACC_ID = CFR2.account_id
        self.CFR2_ACC_KEY = CFR2.key
        self.CFR2_ENDPOINT = CFR2.endpoint
        self.CFR2_BUCKET = CFR2.bucket

        self.s3 = boto3.client(
            's3',
            aws_access_key_id=self.CFR2_ACC_ID,
            aws_secret_access_key=self.CFR2_ACC_KEY,
            endpoint_url=self.CFR2_ENDPOINT
        )
    #-------------------------------------------------------------------------------------------------------#
    # JSON Object up load fucntions
    #-------------------------------------------------------------------------------------------------------#
    # Upload a Document:
    def upload_r2_object(self, json_object, path_key):

        headers = {'x-amz-meta-key1': 'value1', 'x-amz-meta-key2': 'value2'}
        json_data_str = json.dumps(json_object)
        data_send = io.BytesIO(json_data_str.encode())
        self.s3.upload_fileobj(data_send, self.CFR2_BUCKET, path_key, ExtraArgs={'Metadata': headers})
        
    # Download a Document:
    def download_r2_object(self, object_name ):

        self.s3.download_fileobj(self.CFR2_BUCKET, object_name, )
        
    # Delete a Document:
    def delete_r2_object(self, object_name):

        self.s3.delete_object(Bucket=self.CFR2_BUCKET, Key=object_name)
    #-------------------------------------------------------------------------------------------------------#
    # Document up load fucntions
    #-------------------------------------------------------------------------------------------------------#
    # Upload a Document:
    def upload_r2_document(self, object_name, file_path):

        headers = {'x-amz-meta-key1': 'value1', 'x-amz-meta-key2': 'value2'}
        self.s3.upload_file(file_path, self.CFR2_BUCKET, object_name, ExtraArgs={'Metadata': headers})

    # Download a Document:
    def download_r2_document(self, object_name, download_path):

        self.s3.download_file(self.CFR2_BUCKET, object_name, download_path)

    # Update (Put) a Document:
    def update_r2_document(self, object_name, file_path):
        self.upload_r2_document(object_name, file_path) 

    # Delete a Document:
    def delete_r2_document(self, object_name):

        self.s3.delete_object(Bucket=self.CFR2_BUCKET, Key=object_name)

    # Generate Presigned URL:
    def generate_presigned_url(self, object_name, expiration=3600):

        url = self.s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.CFR2_BUCKET, 'Key': object_name},
            ExpiresIn=expiration
        )
        return url


