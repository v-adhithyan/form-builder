from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import view_form, list_forms, view_form_data

urlpatterns = [
    path('form/<uuid:uuid>/', view_form, name='view_form'),
    path('form/<uuid:uuid>/data/', view_form_data, name='view_form_data'),
    path('forms/list/', list_forms, name='list_forms'),
]

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
