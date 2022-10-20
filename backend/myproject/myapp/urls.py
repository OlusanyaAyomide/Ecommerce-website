from django.urls import path
from . import views

urlpatterns = [
    path("latest",views.LatestProductAV.as_view(),name="latest"),
    # path("review",views.CreateReviewAV.as_view(),name="reviews"),
    path("category",views.categoriesGV.as_view(),name="category"),
    path("featured",views.TopProducts.as_view(),name="products"),
    path("store",views.AffiliateGv.as_view(),name="stores"),
    path("topdeals",views.TopListsGv.as_view(),name="topdeals"),
    path("rated",views.MostRatedGV.as_view(),name="most_rated"),
    path("detail/<int:pk>/<str:key>",views.productDetailAV.as_view(),name="detail"),
    path("similar/<int:pk>",views.SimilarGV.as_view(),name="similar"),
    path("recent/<str:key>",views.RecentlyViewed.as_view(),name="recently-viewed"),
    path("search",views.SearchProductGV.as_view(),name="search"),
    path("category/<int:pk>",views.CategoryGV.as_view(),name="category"),
    path("categoryheader/<int:pk>",views.CategoryheaderGV.as_view(),name="catheader")
]
