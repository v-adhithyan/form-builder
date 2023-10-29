from django.contrib import admin

from .models import Form, FormFields, FormSavedData

# Register your models here.
admin.site.register(Form)
admin.site.register(FormFields)
admin.site.register(FormSavedData)
