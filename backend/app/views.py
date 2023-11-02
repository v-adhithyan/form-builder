from django.conf import settings
from django.contrib.admin.views.decorators import staff_member_required
from django.core.paginator import Paginator
from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render

from .forms import construct_form
from .models import Form, FormSavedData


# Create your views here.
def view_form(request, uuid):
    form = get_object_or_404(Form, uuid=uuid)
    if request.method == 'GET':
        dynamic_form = construct_form(form)()
        context = {
            'name': form.name,
            'form': dynamic_form,
        }
        return render(request, 'form.html', context=context)
    elif request.method == 'POST':
        dynamic_form = construct_form(form)(request.POST)
        if dynamic_form.is_valid():
            data = dynamic_form.cleaned_data
            print(data)
            FormSavedData.objects.create(form=form, data=data)
            return HttpResponse('Thank you !')
        context = {
            'name': form.name,
            'form': dynamic_form,
        }
        return render(request, 'form.html', context=context)

    raise Http404


def list_forms(request):
    if not settings.DEBUG:
        raise Http404

    link_href = '<a href="/form/{uuid}">{name}</a>'
    forms = []
    for form in Form.objects.all():
        forms.append(link_href.format(name=form.name, uuid=form.uuid))

    return HttpResponse('<br>'.join(forms))


@staff_member_required
def view_form_data(request, uuid):
    saved_data = FormSavedData.objects.filter(form__uuid=uuid)
    if len(saved_data) == 0:
        return HttpResponse('Data is not yet added!')

    data = [d.data for d in saved_data]
    paginator = Paginator(data, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    keys = []
    if page_obj.object_list:
        keys = page_obj.object_list[0].keys()

    context = {
        'title': saved_data[0].form.name,
        'page_obj': page_obj,
        'keys': keys,
    }
    return render(request, 'view_data.html', context=context)
