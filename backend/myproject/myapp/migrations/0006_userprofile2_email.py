# Generated by Django 4.1.2 on 2022-12-18 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_userprofile2_wishlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile2',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
