from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product,Category,Review
from .serializers import Productserializer,Reviewserializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.

class LatestProductAV(APIView):
    def get(self,request):
        products = Product.objects.all().order_by("-uploaded")[0:11]
        serializer = Productserializer(products,many=True)
        return Response(serializer.data)

class CreateReviewAV(APIView):
    # permission_classes=[IsAuthenticated]
    def get(self,request):
        reviews = Review.objects.all()
        serializer = Reviewserializer(reviews,many=True)
        return Response(serializer.data)
    def post(self,request):
        user = User.objects.get(id=1)
        product = Product.objects.get(id=2)
        serializer = Reviewserializer(data = request.data)
        if serializer.is_valid():
            print(request.user.username)
            serializer.save(customer=user,product = product)
            return Response(serializer.data)
        return Response(serializer.errors)
