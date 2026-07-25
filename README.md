
🤖 AI Coding Agent

An intelligent AI-powered developer workspace that analyzes source code, detects issues, runs code quality checks, and helps developers understand and improve their code through an AI assistant.

🚀 Live Demo

🌐 Frontend:"ai-coding-agent-zeta.vercel.app"

⚙️ Backend API: "https://ai-coding-agent-backend-9uaq.onrender.com"

📚 API Documentation: "https://ai-coding-agent-backend-9uaq.onrender.com/docs"


📌 Overview

AI Coding Agent is an AI-powered coding assistant designed to make code analysis and debugging easier for developers.

Users can upload their source code and get automated insights about:

- 🧠 Code quality
- 🐛 Potential issues
- 🔍 Code analysis
- 🧹 Linting errors
- 📊 Code complexity
- 💬 AI-powered code assistance
- 📝 Detailed analysis reports

The platform combines automated developer tools with AI assistance to create a centralized coding workspace.

✨ Features

🔐 Authentication

- User registration
- Secure login
- JWT-based authentication
- Forgot password functionality
- OTP-based password reset
- Change password from Settings
- Secure password hashing

📂 Code Upload

Upload source code files directly to the workspace.

The system automatically detects the programming language and prepares the uploaded code for analysis.

🔎 Code Analysis

The AI Coding Agent analyzes uploaded source code using multiple tools:

- Code structure analysis
- Code quality checks
- Complexity analysis
- Language detection
- Linting

🧹 Code Linter

Automatically identifies common coding issues and potential improvements.

📊 Complexity Analysis

Analyzes code complexity to help developers understand maintainability and potential optimization areas.

🤖 AI Coding Assistant

Interact with the AI assistant to:

- Understand your code
- Identify problems
- Get improvement suggestions
- Ask coding-related questions
- Receive explanations of complex code

📑 Analysis Reports

Generate structured reports based on automated code analysis and AI insights.

⚙️ Settings

The Settings section allows users to manage their workspace and account preferences.

Available options include:

- AI Assistant settings
- Automatic Code Analysis
- Profile information
- Change Password
- Dark Mode

🛠️ Tech Stack

Frontend

- React
- Vite
- JavaScript
- Axios
- CSS

Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib
- Bcrypt

AI & Code Analysis

- AI-powered code assistance
- Python-based analysis tools
- Code Linter
- Complexity Analyzer
- Language Detection

🏗️ Project Structure

AI-Coding-Agent/
│
├── backend/
│   ├── agent/
│   │   ├── agent.py
│   │   ├── executor.py
│   │   ├── planner.py
│   │   ├── prompts.py
│   │   ├── report_generator.py
│   │   ├── state.py
│   │   └── tool_planner.py
│   │
│   ├── tools/
│   │   ├── code_analyzer.py
│   │   ├── complexity.py
│   │   ├── file_reader.py
│   │   ├── github_loader.py
│   │   ├── language_detector.py
│   │   ├── linter.py
│   │   └── registry.py
│   │
│   ├── storage/
│   │   └── session.py
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Local Setup

1. Clone the Repository

git clone https://github.com/shreyanshdubeyy/AI-Coding-Agent.git
cd AI-Coding-Agent

2. Backend Setup

cd backend

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Start the backend:

uvicorn main:app --reload

The backend will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

3. Frontend Setup

Open a new terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will run at the local Vite URL shown in your terminal.

🔑 Environment Variables

Create a ".env" file inside the backend directory and add the required API credentials.

Example:

GROQ_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here

Never commit your ".env" file or API keys to GitHub.

🌐 Deployment

Frontend

The frontend can be deployed using platforms such as Vercel or Render.

Backend

The backend is deployed using Render.

Production Backend:

https://ai-coding-agent-backend-9uaq.onrender.com

API Documentation:

https://ai-coding-agent-backend-9uaq.onrender.com/docs

🔐 Security

The project includes:

- JWT-based authentication
- Password hashing
- OTP-based password reset
- Protected user authentication flow
- Environment variable based API key management

«For production deployments, always use secure environment variables and HTTPS.»

🎯 Future Improvements

Planned improvements include:

- GitHub repository integration
- Multi-language code execution
- Advanced AI debugging
- Automated code fixing
- Pull Request analysis
- Real-time code collaboration
- Code quality scoring
- Improved dark mode
- Advanced project management
- AI-generated documentation
- Automated test generation

👨‍💻 Author

Shreyansh Dubey

B.Tech — Artificial Intelligence & Robotics

Interested in AI, Robotics, Software Development, and Intelligent Developer Tools.

⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

Built with ❤️ using React, FastAPI, Python, and AI.