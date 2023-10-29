from django import forms
from django.conf import settings

from .models import Form


def construct_form(form: Form):
    form_fields = form.formfields_set.all().order_by('order')

    form_fields_dict = dict()
    for form_field in form_fields:
        field_kwargs = {
            'label': form_field.label,
            'required': form_field.is_required,
            'initial': None,
            'widget': form_field.get_form_field_widget()
        }
        field = form_field.get_form_field()(**field_kwargs)
        form_fields_dict[form_field.name] = field

    if settings.DEBUG:
        print(form_fields_dict)

    DynamicForm = type('DynamicForm', (forms.Form, ), form_fields_dict)
    return DynamicForm
