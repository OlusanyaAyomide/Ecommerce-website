# Generated by Django 4.1 on 2022-10-14 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_alter_product_wishlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
    ]