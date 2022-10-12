from django.urls import path
from . import views

urlpatterns = [
    path("",views.LatestProductAV.as_view(),name="latest"),
    path("review",views.CreateReviewAV.as_view(),name="reviews"),

]
