from unicodedata import category
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Product,Category,Review,Store,AnonymousUser
from .serializers import Productserializer,Reviewserializer,CategorySerializer,StoreSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User 
from django.db.models import Avg,Count,Q
from rest_framework.pagination import PageNumberPagination




# Create your views here.

class LatestProductAV(APIView):
    def get(self,request):
        products = Product.objects.all()[0:10]
        serializer = Productserializer(products,many=True)
        return Response(serializer.data)

class categoriesGV(generics.ListAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
    

class TopProducts(generics.ListAPIView):
    serializer_class=Productserializer
    def get_queryset(self):
        featured = Product.objects.annotate(rating=Avg("review__rating")).order_by("-rating")
        return featured[0:5]



class StorePaginator(PageNumberPagination):
    page_size = 5

class AffiliateGv(generics.ListAPIView):
    serializer_class=StoreSerializer
    pagination_class= StorePaginator
    def get_queryset(self):
        return Store.objects.annotate(count=Count("product")).order_by("-count")


class TopListsGv(generics.ListAPIView):
    serializer_class=Productserializer
    def get_queryset(self):
        products = Product.objects.all().order_by("-discount")[0:12]
        return products

class MostRatedGV(generics.ListAPIView):
    serializer_class = Productserializer
    def get_queryset(self):
        return Product.objects.annotate(rating=Avg("review__rating")).order_by("-rating")[0:12]

class productDetailAV(APIView):
    def get(self,request,pk,key):
        data={}
        product = Product.objects.get(pk=pk)
        if not AnonymousUser.objects.filter(key=key).exists():
            AnonymousUser.objects.create(key=key)
        anonymous_user = AnonymousUser.objects.get(key=key)
        anonymous_user.viewed.add(product)
        anonymous_user.save()
        serializer = Productserializer(product)
        data["detail"]= serializer.data
        store =product.affiliate
        count = 0
        for product in store.product.all():
            count +=product.store
        data["detail"]["stores"]={
            "name":store.name,
            "ProductCount":f'{count} Products',
            "Category":store.category.name
        }
        return Response(data)


class SimilarGV(generics.ListAPIView):
    serializer_class=Productserializer
    def get_queryset(self):
        pk = self.kwargs["pk"]
        Category = Product.objects.get(pk=pk).category
        similar_product = Product.objects.filter(category = Category)
        count = similar_product.count()
        if count < 10:
            return similar_product
        else:
            return similar_product[0:10]


class RecentlyViewed(generics.ListAPIView):
    serializer_class = Productserializer
    def get_queryset(self):
        key = self.kwargs["key"]
        try:
            Anuser = AnonymousUser.objects.get(key=key)
        except:
            Anuser = AnonymousUser.objects.get(id=1)
        products = Anuser.viewed.all()
        if products.count() < 12:
            print(products.count())
            return products
        else:
            return products[0:12]


# class SearchProductGV(generics.ListAPIView):
#     serializer_class=Product

#     def get_queryset(self):
#         param = self.request.GET["param"]
#         product = Product.objects.filter(Q(name__icontains=param)|Q(affiliate__name__icontains = param))
#         print(product)
#         return product

# class SearchProductGV(APIView):
#     def get(self,request,**kwargs):
#         return Response({"test":request.GET["param"]})

class SearchProductGV(APIView):
    def get(self,request,**kwargs):
        param = request.GET["param"]
        products = Product.objects.filter(Q(name__icontains=param)|Q(affiliate__name__icontains = param)|Q(category__name__icontains = param))
        serializers= Productserializer(products,many=True)
        return Response(serializers.data)

class CategoryGV(generics.ListAPIView):
    serializer_class=Productserializer
    def get_queryset(self):
        lookup_fieid = self.kwargs["pk"]
        category = Category.objects.get(pk=lookup_fieid)
        product =Product.objects.filter(category=category)
        return product
    
class CategoryheaderGV(generics.RetrieveAPIView):
    lookup_field="pk"
    serializer_class=CategorySerializer
    queryset=Category.objects.all()