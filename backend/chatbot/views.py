from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from .bot import process_input

@require_POST
def chatbot_view(request):
    user_input = request.POST.get('message', '').strip()

    if not user_input:
        return JsonResponse({'error': 'No message provided'}, status=400)

    try:
        response = process_input(user_input)
        return JsonResponse({'response': response})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
