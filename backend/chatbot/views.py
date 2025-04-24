from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .bot import process_input
from .models import ChatMessage, Patient
from rest_framework.exceptions import APIException
from django.shortcuts import get_object_or_404

class ChatbotView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_input = request.data.get('message', '')
        patient_id = request.data.get('patient_id')
        if not user_input:
            return Response({'error': 'Message is required'}, status=400)

        try:
            # Get the Patient instance linked to the logged-in user
            patient = get_object_or_404(Patient, id=patient_id, registered_by=request.user) 

            # Process input and save message
            response = process_input(user_input)

            # Save the message and response
            ChatMessage.objects.create(
                patient=patient,
                message=user_input,
                response=response
            )

            return Response({'response': response})

        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found'}, status=404)

        except Exception as e:
            # Catch any unexpected errors
            return Response({'error': f'An error occurred: {str(e)}'}, status=500)
