from django import forms
from django.contrib.auth.forms import *
from django.contrib.auth.models import User
from django.apps import apps


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']


class NewsLetterForm(forms.Form):
    your_name = forms.CharField(label='First Name', max_length=30)
    email = forms.EmailField(label='Email', max_length=30)


class ComposeForm(forms.Form):
    message = forms.CharField(
        widget=forms.TextInput(
            attrs={"class": "form-control"}
        )
    )
