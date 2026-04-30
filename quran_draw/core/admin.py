from django.contrib import admin
from .models import Participant, Segment, Result

admin.site.register(Participant)

admin.site.register(Result)



@admin.register(Segment)
class SegmentAdmin(admin.ModelAdmin):
    list_display = ('surah', 'page_number', 'juz')
    list_filter = ('juz',)  # 🔥 الفلترة هنا
    list_display = ('juz', 'surah', 'page_number')
    search_fields = ('surah',)