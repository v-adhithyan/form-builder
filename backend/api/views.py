from app.models import Form, FormFields
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
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
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
    return Response(data=[])

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
