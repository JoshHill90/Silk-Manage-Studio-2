from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from dj_utils.quick_tools import DateFunction
from dj_utils.kekeper import SITE_URLS
import secrets
import string

def genHex():
    alphabet = string.ascii_letters + string.digits
    rand_hex = ''.join(secrets.choice(alphabet) for _ in range(6))
    return rand_hex
class Tag(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return str(self.name)

class Image(models.Model):
    title = models.CharField(max_length=255, blank=False)
    date = models.DateField(auto_now_add=True)
    tag = models.ManyToManyField(Tag, blank=True)
    private = models.BooleanField(default=False)
    image_link = models.URLField(blank=True)
    cloudflare_id = models.CharField(max_length=255, blank=False)
    silk_id = models.CharField(max_length=50, default=SITE_URLS.SILKID)

    def __str__(self):
        return str(self.title)

    def get_absolute_url(self):
        return reverse("image-details", kwargs={"slug": self.cloudflare_id})
    
# settings note: public_access/list_access/downloads/watermark/
# settings note: public_access/random/downloads/watermark/
class Display(models.Model):
    name = models.CharField(max_length=255, unique=True)
    images = models.ManyToManyField(Image, blank=True, null=True, related_name='display_images')
    slug = models.SlugField(max_length=265, unique=True, blank=True)
    settings = models.CharField(max_length=32, default='00')
    header_image = models.ForeignKey(Image,  null=True, blank=True, on_delete=models.SET_NULL, related_name='header_images')
    def __str__(self):
        return str(self.name)
    def get_absolute_url(self):
        return reverse("change-gal", kwargs={"slug": self.slug})
    def save(self, *args, **kwargs):
        if not self.slug:
            alphabet = string.ascii_letters + string.digits
            rand_hex_1 = ''.join(secrets.choice(alphabet) for _ in range(6))
            rand_hex_2 = ''.join(secrets.choice(alphabet) for _ in range(6))
            self.slug = f"{slugify(self.name)}-{rand_hex_1}-{rand_hex_2}"
        super().save(*args, **kwargs)

class DisplayKey(models.Model):
    key = models.CharField(max_length=32, unique=True)
    expire = models.DateField(default=str(DateFunction().number_to_days(90)))
    display = models.ForeignKey(Display, on_delete=models.CASCADE)
    export = models.BooleanField(default=False)
    status = models.CharField(max_length=100, default='review')
    random_order = models.BooleanField(default=False)
    restricted =  models.BooleanField(default=False)
    allowed_email = models.CharField(max_length=200, blank=True)
    allowed_key = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return str(self.display) + ' | ' + str(self.expire) 
    def save(self, *args, **kwargs):
        if not self.allowed_key:
            alphabet = string.ascii_letters + string.digits
            rand_hex_1 = ''.join(secrets.choice(alphabet) for _ in range(16))
            rand_hex_2 = ''.join(secrets.choice(alphabet) for _ in range(16))
            self.allowed_key = f"{slugify(self.display.name)}-{rand_hex_1}-{rand_hex_2}"
        super().save(*args, **kwargs)
    
class DisplayNotes(models.Model):
    uni = models.CharField(max_length=255, unique=True, default=genHex())
    display_key = models.ForeignKey(DisplayKey, on_delete=models.CASCADE)
    image = models.ForeignKey(Image,  null=True, blank=True, on_delete=models.SET_NULL)
    note = models.TextField(max_length=3000)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return str(self.display_key) 
    def save(self, *args, **kwargs):
        if not self.uni:
            self.uni = genHex()
        super().save(*args, **kwargs)