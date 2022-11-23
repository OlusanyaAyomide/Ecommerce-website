from django.contrib import admin
from .models import Product,Review,Store,Category,AnonymousUser,UserProfile2

# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Store)
admin.site.register(Category)
admin.site.register(AnonymousUser)
admin.site.register(UserProfile2)