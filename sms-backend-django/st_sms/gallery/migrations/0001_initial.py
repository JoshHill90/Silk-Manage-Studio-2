# Generated by Django 5.0.4 on 2024-05-01 04:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Display',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('slug', models.SlugField(blank=True, max_length=265, unique=True)),
                ('settings', models.CharField(default='00', max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('date', models.DateField(auto_now_add=True)),
                ('private', models.BooleanField(default=False)),
                ('image_link', models.URLField(blank=True)),
                ('cloudflare_id', models.CharField(max_length=255)),
                ('silk_id', models.CharField(default='JH01', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DisplayKey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=32, unique=True)),
                ('expire', models.DateField(default='2024-07-30')),
                ('export', models.BooleanField(default=False)),
                ('status', models.CharField(default='review', max_length=100)),
                ('random_order', models.BooleanField(default=False)),
                ('restricted', models.BooleanField(default=False)),
                ('allowed_email', models.CharField(blank=True, max_length=200)),
                ('allowed_key', models.CharField(blank=True, max_length=200)),
                ('display', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gallery.display')),
            ],
        ),
        migrations.CreateModel(
            name='DisplayNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uni', models.CharField(default='yrbSwC', max_length=255, unique=True)),
                ('note', models.TextField(max_length=3000)),
                ('date', models.DateField(auto_now_add=True)),
                ('display_key', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gallery.displaykey')),
                ('image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gallery.image')),
            ],
        ),
        migrations.AddField(
            model_name='display',
            name='header_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='header_images', to='gallery.image'),
        ),
        migrations.AddField(
            model_name='display',
            name='images',
            field=models.ManyToManyField(blank=True, null=True, related_name='display_images', to='gallery.image'),
        ),
        migrations.AddField(
            model_name='image',
            name='tag',
            field=models.ManyToManyField(blank=True, to='gallery.tag'),
        ),
    ]
