from django.db import models
from cloudinary.models import CloudinaryField
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib.auth.models import User



# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length = 50)
    image = CloudinaryField("image")

    def __str__(self):
        return f"{self.name} Category"

class Store(models.Model):
    name = models.CharField(max_length = 100)
    category = models.ForeignKey(Category,on_delete = models.SET_NULL,null = True,related_name="store")

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length = 200)
    image = CloudinaryField("image")
    desciption = models.TextField(max_length = 1000)
    store = models.PositiveIntegerField()
    price = models.CharField(max_length=20)
    uploaded = models.DateTimeField(auto_now_add=True)   
    affiliate = models.ForeignKey(Store,on_delete=models.SET_NULL,null = True,related_name="product")
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,null = True,related_name="products") 
    discount = models.IntegerField(null = True,blank = True)
    wishlist = models.ManyToManyField(User,related_name="wishlist",blank=True,null=True)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ("-uploaded",)

class AnonymousUser(models.Model):
    key = models.CharField(max_length = 20)
    viewed  = models.ManyToManyField(Product,related_name = "key")

    def __str__(self):
        return self.key


class Review(models.Model):
    rating = models.PositiveIntegerField(validators = [MinValueValidator(1),MaxValueValidator(5)])
    comment = models.CharField(max_length = 2000)
    created = models.DateField(auto_now_add = True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="review")
    customer = models.ForeignKey(User,on_delete = models.CASCADE,related_name = "reviews")
    title = models.CharField(max_length =100,null = True)



