# 🤖 AI Coding Agent

An intelligent full-stack AI-powered coding assistant that analyzes source code, detects potential issues, evaluates code quality, checks complexity, and provides actionable recommendations through an interactive developer workspace.

Built with **React, Vite, FastAPI, Python, Groq LLM, JWT Authentication, and automated code analysis tools**.

---

## 🚀 Live Demo

🌐 **Frontend:** "https://ai-coding-agent-zeta.vercel.app"

⚙️ **Backend API**: "https://ai-coding-agent-backend-9uaq.onrender.com"

📚 **API Documentation**: "https://ai-coding-agent-backend-9uaq.onrender.com/docs"



> **Note:** The application may take a few seconds to respond if the backend is hosted on a free-tier service.

---

## ✨ Features

### 🤖 AI-Powered Code Analysis

Upload your source code and receive an AI-generated code review containing:

* 📊 Code Quality Score
* 🐛 Bug Detection
* ⚠️ Warning Detection
* 🔐 Security Assessment
* 🧠 Complexity Analysis
* 💡 Improvement Suggestions
* 📝 AI-Generated Summary

The AI analysis is powered by the **Groq LLM API** using the `llama-3.3-70b-versatile` model.

---

### 🧠 Intelligent Agent Architecture

The application follows a structured **planner-executor agent workflow** rather than simply sending code directly to an LLM.

```text
User Uploads Code
       │
       ▼
Language Detection
       │
       ▼
     Planner
       │
       ▼
   Tool Selection
       │
       ├───────────────┬───────────────┐
       ▼               ▼               ▼
 Code Analyzer      Linter       Complexity Analyzer
       │               │               │
       └───────────────┴───────────────┘
                       │
                       ▼
                  AI Analysis
                       │
                       ▼
                Report Generation
                       │
                       ▼
              Code Review Dashboard
```

### Agent Workflow

1. **Language Detection**

   Identifies the programming language of the uploaded source file.

2. **Planning**

   The agent determines which analysis steps and tools are required.

3. **Tool Selection**

   Depending on the uploaded code and language, the agent can select appropriate analysis tools.

4. **Execution**

   The selected tools analyze the source code and return structured results.

5. **AI Analysis**

   The collected information is processed by the LLM to identify bugs, warnings, security concerns, complexity, and improvement opportunities.

6. **Report Generation**

   The results are converted into a structured code review report.

7. **Dashboard**

   The final analysis is displayed through an interactive developer dashboard.

---

## 🛠️ Available Analysis Tools

### 🔍 Code Analyzer

Uses an LLM to analyze source code and generate structured feedback.

The AI returns:

* Summary
* Bugs
* Warnings
* Quality Score
* Complexity
* Security Assessment
* Suggestions

---

### 🧹 Code Linter

The application integrates language-specific linting tools.

| Language   | Tool       |
| ---------- | ---------- |
| Python     | Flake8     |
| JavaScript | ESLint     |
| TypeScript | ESLint     |
| Java       | Checkstyle |
| C++        | Clang-Tidy |

---

### 📈 Complexity Analyzer

For Python code, the application uses **Radon** to analyze cyclomatic complexity.

The tool helps identify code that may be difficult to maintain or understand.

---

### 🌐 Language Detection

Automatically detects supported programming languages based on the uploaded file.

Currently supported file extensions include:

```text
.py
.js
.jsx
.ts
.tsx
.cpp
.c
.java
```

---

## 🔐 Authentication

The application includes a complete authentication system.

### Features

* User Registration
* User Login
* JWT Authentication
* Password Hashing with bcrypt
* Protected User Sessions
* Current User Endpoint
* Logout
* Forgot Password
* OTP-Based Password Reset
* Password Change

Passwords are never stored as plain text.

Passwords are securely hashed using **bcrypt** before being stored in the database.

---

## 🔑 Password Reset Flow

The password reset system follows this flow:

```text
User enters registered email
          │
          ▼
Backend verifies account
          │
          ▼
OTP generated
          │
          ▼
OTP stored temporarily
          │
          ▼
User enters OTP
          │
          ▼
OTP validation
          │
          ▼
New password submitted
          │
          ▼
Password updated
```

The OTP is time-limited and expires after the configured period.

> For production deployment, the OTP flow should be connected to a real email delivery service rather than relying on backend terminal output.

---

## 💻 Tech Stack

### Frontend

* React
* Vite
* Axios
* React Markdown
* React Syntax Highlighter
* CSS
* Lucide Icons

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* JWT
* Passlib
* bcrypt

### AI

* Groq API
* Llama 3.3 70B Versatile

### Code Analysis

* Flake8
* ESLint
* Radon
* Clang-Tidy
* Checkstyle

### Database

* SQLAlchemy ORM
* SQLite for local development
* Configurable database backend

### Deployment

* Vercel
* Render

### Testing & CI

* Pytest
* GitHub Actions

---

## 📁 Project Structure

```text
AI-Coding-Agent/
│
├── backend/
│   │
│   ├── agent/
│   │   ├── agent.py
│   │   ├── executor.py
│   │   ├── planner.py
│   │   ├── prompts.py
│   │   ├── report_generator.py
│   │   ├── state.py
│   │   └── tool_planner.py
│   │
│   ├── auth/
│   │   ├── auth.py
│   │   └── jwt.py
│   │
│   ├── database/
│   │   └── database.py
│   │
│   ├── models/
│   │   └── user.py
│   │
│   ├── storage/
│   │   └── session.py
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
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── test_code_analyzer.py
│   │   ├── test_complexity.py
│   │   ├── test_language_detector.py
│   │   └── test_linter.py
│   │
│   ├── agent/
│   ├── main.py
│   ├── llm.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .github/
│   └── workflows/
│       └── tests.yml
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js 18+
* npm
* Git

For Python code analysis:

* Flake8
* Radon

Depending on the language being analyzed, you may also need:

* ESLint
* Checkstyle
* Clang-Tidy

---

# 🔧 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shreyanshdubeyy/AI-Coding-Agent.git
```

```bash
cd AI-Coding-Agent
```

---

### 2. Navigate to Backend

```bash
cd backend
```

---

### 3. Create Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

Install code analysis tools if they are not already included:

```bash
pip install pytest radon flake8
```

---

### 5. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
```

Never commit `.env` files or API keys to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
venv/
__pycache__/
.pytest_cache/
```

---

### 6. Run Backend

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open a new terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🧪 Testing

The project includes automated tests using **Pytest**.

Current tests cover:

* Code Analyzer
* Complexity Analyzer
* Language Detection
* Linter

Run all tests:

```bash
cd backend
python -m pytest -v
```

Expected result:

```text
6 passed
```

The AI code analyzer test uses a mocked LLM response so that tests do not require a real Groq API key.

This keeps the test suite:

* Fast
* Deterministic
* Secure
* Independent of external AI APIs

---

## 🔄 Continuous Integration

The project uses **GitHub Actions** to automatically run the backend test suite.

The workflow is located at:

```text
.github/workflows/tests.yml
```

The CI pipeline:

1. Checks out the repository
2. Sets up Python
3. Installs dependencies
4. Installs code analysis tools
5. Runs the complete Pytest suite

The tests run automatically on:

* Pushes to `main`
* Pull requests targeting `main`

Example workflow:

```text
Git Push / Pull Request
        │
        ▼
GitHub Actions
        │
        ▼
Setup Python
        │
        ▼
Install Dependencies
        │
        ▼
Run Pytest
        │
        ▼
6 Tests Passed ✅
```

---

## 📸 Screenshots

> Add screenshots of your deployed application here.

### 🔐 Authentication

Add a screenshot showing:

* Login
* Register
* Forgot Password

```md
![Authentication](./screenshots/login.png)
```

---

### 📊 AI Code Review Dashboard

```md
![Code Review Dashboard](./screenshots/dashboard.png)
```

---

### 🤖 AI Code Analysis

```md
![AI Code Analysis](./screenshots/analysis.png)
```

---

### 💬 Chat With Code

```md
![Chat With Code](./screenshots/chat.png)
```

---


## 🔒 Security Considerations

The application implements several security measures:

* Passwords are hashed using bcrypt.
* Authentication uses JWT tokens.
* API keys are stored in environment variables.
* `.env` files are excluded from version control.
* Protected endpoints require authentication.
* Password reset uses time-limited OTPs.

### Production Recommendations

For production deployments, additional security measures should be considered:

* HTTPS
* Rate limiting
* Secure HTTP-only cookies where appropriate
* Short-lived access tokens
* Refresh token rotation
* Email-based OTP delivery
* OTP attempt limits
* Account lockout protection
* Input validation
* Database backups
* Centralized logging
* Monitoring and error tracking

---

## 🌍 Deployment

### Frontend

The frontend can be deployed using:

* Vercel
* Netlify

### Backend

The FastAPI backend can be deployed using:

* Render
* Railway
* Fly.io

Make sure to configure the required environment variables in the deployment platform.

For example:

```text
GROQ_API_KEY
SECRET_KEY
```

Do not upload your `.env` file to the repository.

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Real email-based OTP delivery
* [ ] GitHub repository integration
* [ ] Pull Request code review
* [ ] Support for additional programming languages
* [ ] More advanced static analysis
* [ ] Persistent code analysis history
* [ ] User-specific project workspaces
* [ ] Refresh token authentication
* [ ] Rate limiting
* [ ] Docker support
* [ ] Production-grade database configuration
* [ ] Advanced agent memory
* [ ] Improved multi-tool planning
* [ ] CI/CD deployment pipeline

---

## 📈 Roadmap

### Phase 1 — Core Platform

* [x] User Authentication
* [x] JWT Authorization
* [x] Password Hashing
* [x] Password Reset
* [x] Code Upload
* [x] Language Detection
* [x] AI Code Analysis

### Phase 2 — Developer Tools

* [x] Linter Integration
* [x] Complexity Analysis
* [x] AI Code Review
* [x] Code Chat

### Phase 3 — Engineering Quality

* [x] Automated Tests
* [x] GitHub Actions CI
* [x] Modular Agent Architecture

### Phase 4 — Future

* [ ] GitHub Repository Integration
* [ ] Pull Request Reviews
* [ ] Email OTP
* [ ] Advanced Security Analysis
* [ ] Persistent Analysis History

---

## 🎯 Why This Project?

Most AI coding assistants focus primarily on generating code.

This project focuses on combining:

```text
AI Reasoning
     +
Static Code Analysis
     +
Developer Tools
     +
Agent Architecture
     +
Authentication
     +
Automated Testing
```

The goal is to create an intelligent developer workspace that combines traditional software engineering tools with modern LLM-powered code analysis.

---

## 👨‍💻 Author

**Shreyansh Dubey**

B.Tech — Artificial Intelligence and Robotics

GitHub: [Add your GitHub profile]

LinkedIn: [Add your LinkedIn profile]

---

## 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.

---

⭐ If you found this project interesting, consider giving it a star on GitHub!
