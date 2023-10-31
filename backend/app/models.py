import uuid
from django.db import models

from .constants import FORM_FIELD_CHOICES, FORM_FIELD_INPUTS, FORM_FIELD_WIDGETS


# Create your models here.
class Form(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=False, null=False)

    def __str__(self):
        return self.name


class FormFields(models.Model):
    form = models.ForeignKey(Form, on_delete=models.PROTECT)
    field_type = models.CharField(max_length=2, choices=FORM_FIELD_CHOICES)
    label = models.CharField(max_length=100, blank=False, null=False)
    name = models.CharField(max_length=100, blank=False, null=False)
    placeholder = models.CharField(max_length=100, blank=False, null=False)
    order = models.PositiveIntegerField(default=0)
    is_required = models.BooleanField(default=True)
    min_length = models.PositiveIntegerField(default=0)
    max_length = models.PositiveIntegerField(default=0)
    choices = models.TextField(blank=True, null=True)

    def get_form_field(self):
        return FORM_FIELD_INPUTS[self.field_type]

    def get_form_field_widget(self):
        return FORM_FIELD_WIDGETS.get(self.field_type)

    def __str__(self):
        return f'{self.form.name} - {self.name} - {self.get_field_type_display()}'


class FormSavedData(models.Model):
    form = models.ForeignKey(Form, on_delete=models.DO_NOTHING)
    data = models.JSONField(blank=False, null=False)
