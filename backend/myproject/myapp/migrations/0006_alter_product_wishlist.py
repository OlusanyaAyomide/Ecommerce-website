# Generated by Django 4.1 on 2022-10-13 23:44

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0005_alter_product_options_product_wishlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='wishlist',
            field=models.ManyToManyField(blank=True, related_name='wishlist', to=settings.AUTH_USER_MODEL),
        ),
    ]
