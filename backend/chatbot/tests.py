from .bot import conversation
def run_chatbot():
    print("👋 Welcome to MindBot — your AI mental health assistant.")
    print("Type 'exit' to end the session.\n")
    
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        response = conversation.predict(input=user_input)
        print("Bot:", response)
