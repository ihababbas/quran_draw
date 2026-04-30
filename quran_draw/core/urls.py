from django.urls import path
from .views import main_home, multi_page, single_page, draw, draw_single

urlpatterns = [
    path('', main_home),
    path('multi/', multi_page),
    path('single/', single_page),

    path('draw/', draw),
    path('draw-single/', draw_single),
]