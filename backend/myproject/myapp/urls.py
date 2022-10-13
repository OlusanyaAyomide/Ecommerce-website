from django.urls import path
from . import views

urlpatterns = [
    path("latest",views.LatestProductAV.as_view(),name="latest"),
    # path("review",views.CreateReviewAV.as_view(),name="reviews"),
    path("category",views.categoriesGV.as_view(),name="category"),
    path("featured",views.TopProducts.as_view(),name="products"),
    path("store",views.AffiliateGv.as_view(),name="stores"),
]
