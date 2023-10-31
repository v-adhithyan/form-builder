from rest_framework import serializers
from app.models import FormFields
from app import constants as app_constants


class FormFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormFields
        fields = '__all__'
