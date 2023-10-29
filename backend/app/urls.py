from django.urls import path

from .views import view_form, list_forms, view_form_data

urlpatterns = [
    path('form/<uuid:uuid>/', view_form, name='view_form'),
    path('form/<uuid:uuid>/data/', view_form_data, name='view_form_data'),
    path('forms/list/', list_forms, name='list_forms'),
]
