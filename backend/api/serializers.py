from rest_framework import serializers
from app.models import FormFields, Form
from app import constants as app_constants


class FormFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormFields
        fields = '__all__'


class FormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Form
        fields = '__all__'
