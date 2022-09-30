from django.urls import path
from . import views

urlpatterns = [
    path("",views.LatestProductAV.as_view(),name="latest")
]
