from django import forms


class ContactForm(forms.Form):

    name = forms.CharField(
        max_length=100,
        label="الاسم"
    )

    email = forms.EmailField(
        label="البريد الإلكتروني"
    )

    subject = forms.CharField(
        max_length=150,
        label="الموضوع"
    )

    message = forms.CharField(
        widget=forms.Textarea(
            attrs={
                "rows":6
            }
        ),
        label="الرسالة"
    )