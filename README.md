# 🤖 AI Coding Agent

An intelligent AI-powered coding assistant that analyzes source code, detects potential issues, evaluates code quality, and provides actionable recommendations to help developers write cleaner, safer, and more maintainable code.

---

## 🚀 Overview

**AI Coding Agent** is a full-stack AI-powered code analysis platform designed to act as an intelligent coding companion.

Users can upload their source code, and the system automatically detects the programming language, analyzes the code, identifies bugs and warnings, evaluates complexity and security, and generates AI-powered suggestions for improvement.

The project combines **AI agents, automated code analysis tools, and a modern web interface** into a single developer-focused platform.

---

## ✨ Features

### 📂 Code Upload

* Upload source code files directly through the web interface.
* Automatically detect the programming language.
* Store the uploaded file for analysis and AI interaction.

### 🧠 AI Code Analysis

* Generate an overall code quality score.
* Analyze code structure and behavior.
* Generate a detailed code summary.
* Identify potential problems and improvement areas.

### 🐛 Bug Detection

* Detect potential bugs and logical issues.
* Display issue titles and descriptions.
* Categorize issues based on severity.

### ⚠️ Warning Detection

* Identify potential code smells and risky patterns.
* Highlight areas that may cause future problems.

### ⚡ Complexity Analysis

* Evaluate code complexity.
* Help developers identify difficult-to-maintain code sections.

### 🔒 Security Analysis

* Identify potential security concerns.
* Highlight risky coding practices.

### 💡 AI Suggestions

* Provide actionable recommendations.
* Suggest improvements for readability, performance, maintainability, and code quality.

### 💬 AI Coding Assistant

* Interact with the uploaded code using natural language.
* Ask questions about the codebase.
* Get AI-generated explanations and coding guidance.

### 🛠️ Developer Tools

The agent architecture supports multiple analysis tools, including:

* File Reader
* Code Analyzer
* Linter
* Complexity Analyzer
* Language Detector
* GitHub Loader
* Tool Registry

---

## 🏗️ Project Architecture

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
│   ├── tools/
│   │   ├── file_reader.py
│   │   ├── code_analyzer.py
│   │   ├── linter.py
│   │   ├── complexity.py
│   │   ├── language_detector.py
│   │   ├── github_loader.py
│   │   └── registry.py
│   │
│   ├── storage/
│   │   └── session.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔄 How It Works

```text
          ┌─────────────────┐
          │   Upload Code   │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Language Detect │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   AI Planner    │
          └────────┬────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Analysis Toolchain  │
        │                      │
        │  • Linter            │
        │  • Code Analyzer     │
        │  • Complexity        │
        │  • Security          │
        └──────────┬───────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Report Generator│
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Analysis Result │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ AI Code Chat    │
          └─────────────────┘
```

---

## 🧰 Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Markdown
* CSS

### Backend

* Python
* FastAPI
* Uvicorn

### AI & Analysis

* AI-powered code analysis
* LLM-based reasoning
* Automated linting
* Complexity analysis
* Security analysis
* Language detection

### Development Tools

* Git
* GitHub
* VS Code
* Render

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shreyanshdubeyy/AI-Coding-Agent.git
cd AI-Coding-Agent
```

---

## 🖥️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
AI_API_KEY=your_api_key_here
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The backend will run on:

```text
http://127.0.0.1:8000
```

---

## 🎨 Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Upload Code

```http
POST /upload
```

Uploads a source code file and prepares it for analysis.

---

### Analyze Code

```http
POST /analyze
```

Analyzes the uploaded source code and generates a structured code analysis report.

---

### Chat With Code

```http
POST /chat-code
```

Allows users to interact with their uploaded code using natural language.

---

## 📊 Analysis Output

The AI Coding Agent generates insights such as:

```text
Code Quality Score
├── Bugs
├── Warnings
├── Complexity
├── Security
├── Code Summary
└── AI Suggestions
```

Example:

```json
{
  "quality_score": 85,
  "bugs": [],
  "warnings": [],
  "complexity": "Medium",
  "security": "Good",
  "summary": "The code is well structured and readable.",
  "suggestions": [
    "Improve error handling",
    "Reduce function complexity",
    "Add input validation"
  ]
}
```

---

## 🧠 Agent Architecture

The project follows an agent-based architecture.

### Planner

Determines which analysis steps should be executed.

### Executor

Executes the selected tools.

### Tool Registry

Maintains the available analysis tools.

### State Management

Maintains the uploaded file and session context.

### Report Generator

Combines tool outputs into a structured analysis report.

This architecture makes it possible to add new tools and capabilities without significantly changing the core agent.

---

## 🌟 Future Improvements

Planned improvements include:

* [ ] Multi-file project analysis
* [ ] GitHub repository integration
* [ ] Automated code fixing
* [ ] AI-generated pull requests
* [ ] Code refactoring suggestions
* [ ] Real-time code editor
* [ ] Support for more programming languages
* [ ] Advanced security scanning
* [ ] Test generation
* [ ] Unit test execution
* [ ] Code visualization
* [ ] Project-level dependency analysis
* [ ] User authentication
* [ ] Persistent project history
* [ ] Advanced AI agent workflows

---

## 🎯 Project Goal

The goal of **AI Coding Agent** is to build an intelligent developer assistant that goes beyond simple code completion.

Instead of only generating code, the agent is designed to:

> **Understand → Analyze → Detect → Explain → Suggest → Improve**

The long-term vision is to create an autonomous AI engineering assistant capable of analyzing complete software projects, identifying issues, suggesting solutions, and helping developers improve their codebase.

---

## 👨‍💻 Author

**Shreyansh Dubey**

B.Tech — Artificial Intelligence and Robotics

Interested in:

* Artificial Intelligence
* Machine Learning
* Generative AI
* AI Agents
* Software Development
* Robotics

---

## 📄 License

This project is currently intended for educational and development purposes.

More licensing information will be added in future releases.
