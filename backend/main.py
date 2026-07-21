
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import ask_llm
print("THIS IS THE MAIN FILE BEING LOADED")
from tools.file_reader import read_file
from tools.code_analyzer import analyze_code
from tools.language_detector import detect_language
from agent.agent import run_agent
from storage.session import CURRENT_FILE, CHAT_HISTORY


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str

class CodeChatRequest(BaseModel):
    question: str    



@app.get("/")
def home():
    return {"message": "AI Coding Agent Backend is running!"}

@app.post("/chat")
def chat(request: ChatRequest):
    response = ask_llm(request.prompt)
    return {
        "response": response
    }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    print("UPLOAD ENDPOINT HIT")
    result = await read_file(file)

    if not result["success"]:
        return result

    language = detect_language(result["filename"])

    # Save uploaded file in memory
    CURRENT_FILE["filename"] = result["filename"]
    CURRENT_FILE["language"] = language
    CURRENT_FILE["content"] = result["content"]
    CURRENT_FILE["file_path"] = result["file_path"]
    
    CHAT_HISTORY.clear()
    print("CURRENT_FILE after upload:", CURRENT_FILE)
    print("UPLOAD:", CURRENT_FILE)

    

    return {
    "message": "File uploaded successfully",
    "filename": CURRENT_FILE["filename"],
    "language": CURRENT_FILE["language"],
    "content": CURRENT_FILE["content"]
}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    result = await read_file(file)

    if not result["success"]:
        return result

    analysis = analyze_code(result["content"])

    return {
        "filename": result["filename"],
        "analysis": analysis
    }

@app.post("/agent")
async def agent(
    task: str = Form(...),
    file: UploadFile = File(...)
):
    # Read and save the uploaded file
    result = await read_file(file)

    if not result["success"]:
        return result

    # Detect language
    language = detect_language(result["filename"])

    # Run the agent
    response = run_agent(
        task=task,
        language=language,
        file_path=result["file_path"]
    )

    return response

@app.get("/test-planner")
def test_planner():

    from agent.tool_planner import decide_tools

    tools = decide_tools("Review my code completely")

    return {
        "selected_tools": tools
    }

@app.post("/chat-code")
def chat_with_code(request: CodeChatRequest):

    if CURRENT_FILE["content"] is None:
        return {
            "success": False,
            "message": "Please upload a file first."
        }

    # Add user question to chat history
    CHAT_HISTORY.append({
        "role": "user",
        "content": request.question
    })

    # Create conversation history
    conversation = ""

    for message in CHAT_HISTORY:
        conversation += f"""
{message["role"].upper()}:
{message["content"]}
"""

    prompt = f"""
You are an expert AI Coding Assistant.

Programming Language:
{CURRENT_FILE["language"]}

Filename:
{CURRENT_FILE["filename"]}

Uploaded Code:
{CURRENT_FILE["content"]}

Previous Conversation:
{conversation}

Answer the user's latest question based on the uploaded code
and previous conversation.

Answer in simple English.
If needed, include corrected code.
"""

    response = ask_llm(prompt)

    # Save AI response
    CHAT_HISTORY.append({
        "role": "assistant",
        "content": response
    })

    return {
        "success": True,
        "answer": response
    }