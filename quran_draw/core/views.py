import random
import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Segment
from django.views.decorators.csrf import csrf_exempt

from django.contrib import messages
from django.core.mail import send_mail

from .forms import ContactForm
from django.conf import settings
from django.core.mail import EmailMessage



# ===== الصفحات =====

def main_home(request):
    return render(request, 'home.html')


def multi_page(request):
    return render(request, 'multi.html')


def single_page(request):  # 🔥 هذا كان ناقص
    return render(request, 'single.html')


# ===== مستويات =====

LEVEL_MAP = {
    5: 3,
    10: 5,
    15: 8,
    20: 10,
    25: 13,
    30: 15
}


# ===== سحب متعدد =====
@csrf_exempt
def draw(request):

    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"})

    try:
        data = json.loads(request.body)

        selected_parts = data.get("parts")
        level = int(data.get("level"))

        if not selected_parts or not level:
            return JsonResponse({"error": "بيانات ناقصة"})

        count = LEVEL_MAP[level]

        chosen_parts = sorted(random.sample(selected_parts, count))
        results = []

        for part in chosen_parts:
            segments = Segment.objects.filter(juz=part)

            if segments.exists():
                segment = random.choice(list(segments))

                results.append({
                    "juz": part,
                    "surah": segment.surah,
                    "page": segment.page_number
                })

        return JsonResponse({
            "chosen_parts": chosen_parts,
            "results": results
        })

    except Exception as e:
        return JsonResponse({"error": str(e)})


# ===== سحب جزء واحد =====
@csrf_exempt
def draw_single(request):

    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"})

    try:
        data = json.loads(request.body)

        name = data.get('name')
        juz = int(data.get('juz'))
        count = int(data.get('count'))

        if not name or not juz or not count:
            return JsonResponse({'error': 'بيانات ناقصة'})

        segments = list(Segment.objects.filter(juz=juz))

        if len(segments) < count:
            return JsonResponse({'error': 'عدد المواضع غير كافي'})

        chosen = random.sample(segments, count)

        # 🔥 ترتيب حسب الصفحة
        chosen = sorted(chosen, key=lambda x: x.page_number)

        results = [{
            'juz': s.juz,
            'surah': s.surah,
            'page': s.page_number
        } for s in chosen]

        return JsonResponse({
            'name': name,
            'juz': juz,
            'results': results
        })

    except Exception as e:
        return JsonResponse({'error': str(e)})
    
def memory_game(request):

    return render(request,"games/memory.html")


def page_game(request):

    return render(request,"games/pagenumber.html")

def surah_order_game(request):

    return render(request,"games/surah_order.html")


def contact(request):
    return render(request, "contact.html")
    form = ContactForm()

    if request.method == "POST":

        form = ContactForm(request.POST)

        if form.is_valid():

            name = form.cleaned_data["name"]
            email = form.cleaned_data["email"]
            subject = form.cleaned_data["subject"]
            message = form.cleaned_data["message"]

            messages.success(
                request,
                "تم إرسال رسالتك بنجاح."
            )

            return redirect("contact")

    return render(

        request,

        "contact.html",

        {

            "form":form

        }

    )