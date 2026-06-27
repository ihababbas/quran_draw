from django.urls import path
from .views import main_home, multi_page, single_page, draw, draw_single , memory_game , page_game , surah_order_game , contact


urlpatterns = [
    path('', main_home),
    path('multi/', multi_page),
    path('single/', single_page),

    path('draw/', draw),
    path('draw-single/', draw_single),
    path("games/memory/", memory_game, name="memory"),
    path("games/pagenumber/", page_game, name="pagenumber"),
    path("games/surah-order/", surah_order_game, name="surah_order"),
    path("contact/", contact, name="contact"),

]