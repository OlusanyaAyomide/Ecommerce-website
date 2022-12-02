from unicodedata import category
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Product,Category,Review,Store,AnonymousUser,UserProfile2
from .serializers import Productserializer,Reviewserializer,CategorySerializer,StoreSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User 
from django.db.models import Avg,Count,Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
import random
from rest_framework.exceptions import ValidationError

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

class ProductpredictGV(generics.ListAPIView):
    serializer_class=Productserializer
    def get_queryset(self):
        params = self.request.GET["param"]
        product = Product.objects.filter(Q(name__icontains = params)|Q(affiliate__name__icontains = params))
        if product.count() > 8:
            return product[0:8]
        return product

class userinfoAV(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        profile = request.user.profile2
        serializer = UserSerializer(profile)
        return Response(serializer.data)

class TrendingGV(generics.ListAPIView):
    serializer_class=Productserializer

    def get_queryset(self):
        pk = self.kwargs["pk"]
        Category = Product.objects.filter(category__id = pk)
        product = Category.annotate(avgrating = Avg("review__rating")).filter(avgrating__gte=4)
        orderedproduct = product.annotate(order = Count("review")).order_by("order")
        if orderedproduct.count() > 6:
            return orderedproduct[0:6]
        return orderedproduct
        

class CheckOutAV(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        user = request.user
        body = request.data
        print(body["repeated"])
        for productlist in body["productlist"]:
            count = 1
            currentid = int(productlist["id"])
            try:
                count = body["repeated"][f"product{currentid}"]["count"]
                print(count)
            except:
                count = 1

            ProductItem = Product.objects.get(id = currentid)
            if ProductItem.store < count:
                setrandom = random.randint(7,31)
                ProductItem.store = setrandom
            ProductItem.store -= count
            ProductItem.save()

            userProfile =  UserProfile2.objects.get(user = user)
            userProfile.purchasedField.add(ProductItem)
            userProfile.save()
        return Response({"reply":"seen"})


class WishListAV(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request,pk):
        userprofile = UserProfile2.objects.get(user = request.user)
        product = Product.objects.get(id = pk) 
        userprofile.wishlist.add(product)
        userprofile.save()
        serializer = UserSerializer(userprofile)
        return Response(serializer.data)

class WishListRemoveAV(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk):
        userprofile = request.user.profile2
        product = Product.objects.get(id=pk)
        userprofile.wishlist.remove(product)
        userprofile.save()
        serializer = UserSerializer(userprofile)
        return Response(serializer.data)



class ReviewCreateAV(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk):
        product = Product.objects.get(id = pk)
        userprofile = request.user.profile2
        purchased = False
        print(product)
        for productitem in userprofile.purchasedField.all():
            if productitem == product:
                purchased = True 
        print("loop completed")
        print(purchased)
        if not purchased:
            print("revertingg")
            raise ValidationError("Product Not Purchased By User")
        serializer = Reviewserializer(data = request.data)
        if serializer.is_valid():
            serializer.save(product = product,customer = self.request.user)
            userserializer = UserSerializer(userprofile)
            return Response(userserializer.data)