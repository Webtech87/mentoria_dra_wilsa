from django.shortcuts import render
from .forms import ContactForm

def index(request):
	form = ContactForm(request.POST or None)
	context = {
		'title': 'Mentoria Dra Wilsa',
		'form': form,
	}
	if request.method == 'POST':
		if form.is_valid():
			context['form_data'] = form.cleaned_data
			
		
	print('++',context)
	return render(request, 'index.html', context)