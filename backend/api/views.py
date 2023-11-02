from app.models import Form, FormFields, FormSavedData
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import FormFieldsSerializer, FormSerializer


class FormBuildView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        serializer = FormFieldsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FormView(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
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
    form = get_object_or_404(Form, uuid=uuid)
    form_data = request.data

    # Retrieve the associated FormFields objects based on field names
    field_names = form_data.keys()
    form_fields = FormFields.objects.filter(name__in=field_names)

    # Create a dictionary to store validation errors
    validation_errors = {}

    for field_name, field_value in form_data.items():
        # Get the corresponding FormFields object
        form_field = form_fields.filter(name=field_name).first()

        if form_field:
            # Check if the field is required and empty
            if form_field.is_required and not field_value:
                validation_errors[field_name] = 'This field is required.'

            # Check if the field length is within the specified limits
            min_length = form_field.min_length
            max_length = form_field.max_length

            if min_length > 0 and len(field_value) < min_length:
                validation_errors[field_name] = f'This field must have at least {min_length} characters.'
            elif max_length > 0 and len(field_value) > max_length:
                validation_errors[field_name] = f'This field cannot exceed {max_length} characters.'

    if validation_errors:
        return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY, data=validation_errors)

    FormSavedData.objects.create(form=form, data=form_data)
    return Response(status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials or Not a Staff Member'}, status=status.HTTP_401_UNAUTHORIZED)
