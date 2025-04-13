from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.runnables import RunnableLambda
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from backend.settings import Google_Api_key

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.3
)

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template="""
You are a compassionate and smart mental health assistant.
Your job is to diagnose psychiatric conditions by asking relevant questions.
Follow a medical questionnaire style.
Don't repeat previously asked questions.

Conversation History:
{history}

User Input: {input}

Ask the next appropriate psychiatric question.
Once enough data is gathered, give a diagnosis and recommend tests (PHQ-9, GAD-7,).
"""
)

memory_store = {}

def get_memory(session_id):
    if session_id not in memory_store:
        memory_store[session_id] = InMemoryChatMessageHistory()
    return memory_store[session_id]

def format_history(memory):
    history_str = ""
    for msg in memory.messages:
        if isinstance(msg, HumanMessage):
            history_str += f"User: {msg.content}\n"
        elif isinstance(msg, AIMessage):
            history_str += f"Assistant: {msg.content}\n"
    return history_str.strip()

def chain_func(inputs, config):
    session_id = config["configurable"]["session_id"]
    memory = get_memory(session_id)
    history_text = format_history(memory)

    formatted_prompt = prompt.format(
        history=history_text,
        input=inputs["input"]
    )

    response = llm.invoke([HumanMessage(content=formatted_prompt)])

    memory.add_user_message(inputs["input"])
    memory.add_ai_message(response.content)

    return response

def process_input(user_input, session_id="default-user"):
    return chain_func({"input": user_input}, {"configurable": {"session_id": session_id}}).content
