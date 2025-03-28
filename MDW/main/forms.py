from django import forms
from django.db import models


class ContactForm(forms.Form):
	class SubjectOptions(models.TextChoices):
		select = "Select", "Select"
		option1 = "option1", "option1"
		option2 = "option2", "option2"
		option3 = "option3", "option3"
		option4 = "option4", "option4"
		option5 = "option5", "option5"
		
	name = forms.CharField(max_length=100)
	subject = forms.ChoiceField(choices=SubjectOptions,initial=SubjectOptions.select)
	email = forms.EmailField()
	tel = forms.RegexField(
		regex=r'^\d+$',
		max_length=20,
		error_messages={'invalid': 'Enter a valid phone number.'},
		label="Phone Number"
	)
	message = forms.CharField(widget=forms.Textarea)
	accept_terms = forms.BooleanField(required=False)