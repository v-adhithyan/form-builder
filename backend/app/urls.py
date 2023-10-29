from django.urls import path

from .views import view_form, list_forms

urlpatterns = [
    path('form/<uuid:uuid>/', view_form, name='view_form'),
    path('forms/list/', list_forms, name='list_forms'),
]
