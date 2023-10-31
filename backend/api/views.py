from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.viewsets import ModelViewSet

from .serializers import FormFieldsSerializer, FormSerializer
from app.models import Form, FormFields


class FormBuildView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FormFieldsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FormView(ModelViewSet):
    serializer_class = FormSerializer
    queryset = Form.objects.all()

@api_view(['GET'])
def form_fields_view(request, uuid):
    form = get_object_or_404(Form, uuid=uuid)
    form_fields = FormFields.objects.filter(form=form)
    serializer = FormFieldsSerializer(form_fields, many=True)
    data = {
        'name': form.name,
        'description': form.description,
        'fields': serializer.data,
    }
    return Response(data)


@api_view(['POST'])
def submit_form_data(request, uuid):
    return Response(data=[])
