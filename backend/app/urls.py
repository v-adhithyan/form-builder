from django.urls import path

from .views import view_form

urlpatterns = [
    path('form/<uuid:uuid>/', view_form, name='view_form'),
]
