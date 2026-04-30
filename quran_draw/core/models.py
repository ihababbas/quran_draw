from django.db import models

class Participant(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField()

    def __str__(self):
        return self.name


class Segment(models.Model):
    surah = models.CharField(max_length=100)
    page_number = models.IntegerField()
    
    juz = models.IntegerField()

    def __str__(self):
        return f"{self.surah} ({self.page_number})"


class Result(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    segment = models.ForeignKey(Segment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)