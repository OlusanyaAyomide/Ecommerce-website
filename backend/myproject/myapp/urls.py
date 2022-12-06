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
    path("categoryheader/<int:pk>",views.CategoryheaderGV.as_view(),name="catheader"),
    path("predict",views.ProductpredictGV.as_view(),name="predictor"),
    path("profile",views.userinfoAV.as_view(),name ="profile"),
    path("catrending/<int:pk>",views.TrendingGV.as_view(),name="trending-category"),
    path("checkout",views.CheckOutAV.as_view(),name="checkout"),
    path("wishlist/<int:pk>",views.WishListAV.as_view(),name="wishlist"),
    path("wishlistremove/<int:pk>",views.WishListRemoveAV.as_view(),name="wishlist-remove"),
    path("review-create/<int:pk>",views.ReviewCreateAV.as_view(),name = "review-create"),
    path("signup",views.SignUp.as_view(),name="sign-up")
]
