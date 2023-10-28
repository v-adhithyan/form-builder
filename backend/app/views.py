from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from .models import Form


# Create your views here.
def view_form(request, uuid):
    form = get_object_or_404(Form, uuid=uuid)
    return HttpResponse(form.name)
