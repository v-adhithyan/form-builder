from django.urls import path
from .views import FormBuildView

urlpatterns = [
    path('form/build/', FormBuildView.as_view()),
]
