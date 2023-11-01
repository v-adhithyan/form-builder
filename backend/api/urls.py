from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import FormBuildView, FormView, form_fields_view, submit_form_data, LoginView

router = SimpleRouter()
router.register('form', FormView)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('form/build/', FormBuildView.as_view()),
    path('form/fields/<uuid:uuid>/', form_fields_view, name='form-fields'),
    path('public/form/<uuid:uuid>/submit/', submit_form_data, name='submit-form-data'),
    path('', include(router.urls)),
]
