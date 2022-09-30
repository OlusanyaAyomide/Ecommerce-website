from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product,Category,Review
from .serializers import Productserializer,Reviewserializer

# Create your views here.

class LatestProductAV(APIView):
    def get(self,request):
        products = Product.objects.all().order_by("-uploaded")[0:11]
        serializer = Productserializer(products,many=True)
        return Response(serializer.data)