from rest_framework import serializers
from .models import Product,Review,Category,Store,UserProfile2
from django.contrib.auth.models import User

pathname = "https://res.cloudinary.com/da3wqzkz3/image/upload/v1664193313/"
class Reviewserializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField(read_only = True)
    class Meta:
        model = Review
        exclude = ["product"]

class Productserializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    affiliate = serializers.StringRelatedField(read_only = True)
    review = Reviewserializer(many=True,read_only = True)
    reviews = serializers.SerializerMethodField()
    totalR = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id","name","url","desciption","store","price","affiliate","review","reviews","totalR","discount"]

    def get_url(self,object):
        return f"https://res.cloudinary.com/da3wqzkz3/image/upload/v1664193313/{object.image}"

    def get_reviews(self,object):
        reviews = Review.objects.filter(product = object)
        if reviews.count() == 0:
            return "No Reviews yet"
        array =[]
        for item in reviews:
            array.append(item.rating)
        return round(sum(array)/len(array),1)

    def get_totalR(self,object):
      review = Review.objects.filter(product=object)
      return review.count()

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = "__all__"
    def get_image(self,object):
        return f"https://res.cloudinary.com/da3wqzkz3/image/upload/v1664193313/{object.image}"

class StoreSerializer(serializers.ModelSerializer):
    store = serializers.SerializerMethodField()
    product = Productserializer(many=True,read_only=True)
    class Meta:
        model = Store
        fields = ["id","store","product"]
    def get_store(self,object):
        return object.name


class UserSerializer(serializers.ModelSerializer):
    purchasedField  = Productserializer(many=True,read_only=True)
    wishlist = Productserializer(many=True,read_only=True)
    user = serializers.StringRelatedField()
    newemail = serializers.SerializerMethodField()
    class Meta:
        model = UserProfile2
        fields="__all__"

    def get_newemail(self,object):
        user = User.objects.get(username = object.user)
        return user.email