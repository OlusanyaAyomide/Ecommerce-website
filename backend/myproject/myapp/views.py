from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Product,Category,Review,Store
from .serializers import Productserializer,Reviewserializer,CategorySerializer,StoreSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User 
from django.db.models import Avg
from rest_framework.pagination import PageNumberPagination



# Create your views here.

class LatestProductAV(APIView):
    def get(self,request):
        products = Product.objects.all()[0:11]
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
    queryset = Store.objects.all()

# class AffiliateGv(APIView):
#     def get(self,request):
#         store = Store.objects.all()
#         serializer = StoreSerializer(store,many=True)
#         return Response(serializer.data)