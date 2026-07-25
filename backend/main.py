
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
from llm import ask_llm


print("THIS IS THE MAIN FILE BEING LOADED")

from tools.file_reader import read_file
from tools.code_analyzer import analyze_code
from tools.language_detector import detect_language
from agent.agent import run_agent
from storage.session import CURRENT_FILE, CHAT_HISTORY
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database.database import Base, engine, get_db
from models.user import User
from auth.jwt import create_access_token
from auth.auth import get_current_user

app = FastAPI()
# Create database tables
Base.metadata.create_all(bind=engine)
RESET_OTPS = {}

# Password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://ai-coding-agent-zeta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    prompt: str


class CodeChatRequest(BaseModel):
    question: str

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str   

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str     

class ChangePasswordRequest(BaseModel):
    email: EmailStr
    current_password: str
    new_password: str

@app.post("/auth/register")
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    # Check if user already exists
    existing_user = db.query(User).filter(
        User.email == request.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = pwd_context.hash(
        request.password
    )

    # Create user
    new_user = User(
        name=request.name,
        email=request.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "Account created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }

@app.post("/auth/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == request.email
    ).first()

    print("LOGIN EMAIL:", request.email)
    print("USER FOUND:", user is not None)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_match = pwd_context.verify(
        request.password,
        user.hashed_password
    )

    print("PASSWORD MATCH:", password_match)

    if not password_match:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "name": user.name
    })

    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@app.post("/auth/change-password")
def change_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify current password
    if not pwd_context.verify(
        request.current_password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Current password is incorrect"
        )

    # Hash new password
    user.hashed_password = pwd_context.hash(
        request.new_password
    )

    db.commit()

    return {
        "success": True,
        "message": "Password changed successfully"
    }    

@app.get("/auth/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "success": True,
        "user": current_user
    }
@app.post("/auth/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:
        return {
            "success": False,
            "message": "No account found with this email."
        }

    otp = str(random.randint(100000, 999999))

    RESET_OTPS[request.email] = {
        "otp": otp,
        "expires_at": datetime.utcnow() + timedelta(minutes=10)
    }

    print("PASSWORD RESET OTP:", otp)

    return {
        "success": True,
        "message": "OTP generated successfully.",
        "otp": otp
    }

    

@app.post("/auth/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    # Check if OTP exists
    reset_data = RESET_OTPS.get(request.email)

    if not reset_data:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired OTP"
        )

    # Check OTP
    if reset_data["otp"] != request.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    # Check OTP expiry
    if datetime.utcnow() > reset_data["expires_at"]:
        del RESET_OTPS[request.email]

        raise HTTPException(
            status_code=400,
            detail="OTP has expired"
        )

    # Find user
    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Hash new password
    user.hashed_password = pwd_context.hash(
        request.new_password
    )

    # Save changes
    db.commit()

    # Remove used OTP
    del RESET_OTPS[request.email]

    return {
        "success": True,
        "message": "Password reset successfully"
    }    
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

    if not request.question.strip():
        return {
            "success": False,
            "message": "Please enter a question."
        }

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

Rules:
- Give accurate answers based on the uploaded code.
- Explain bugs clearly.
- Suggest improvements when useful.
- If code needs correction, provide corrected code.
- Keep the answer easy to understand.
- Do not invent code that is unrelated to the uploaded file.

Answer in simple English.
"""

    try:

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

    except Exception as e:

        # Remove last user message if AI request fails
        if CHAT_HISTORY and CHAT_HISTORY[-1]["role"] == "user":
            CHAT_HISTORY.pop()

        return {
            "success": False,
            "message": "AI service is temporarily unavailable.",
            "error": str(e)
        }
