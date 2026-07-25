
import SplashScreen from "./components/SplashScreen";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";
import {
  Prism as SyntaxHighlighter
} from "react-syntax-highlighter";

import {
  vscDarkPlus
} from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
const API_URL = "https://ai-coding-agent-backend-9uaq.onrender.com";
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("access_token")
);

const [authMode, setAuthMode] = useState("login");

const [authForm, setAuthForm] = useState({
  name: "",
  email: "",
  password: ""
});

const [authLoading, setAuthLoading] = useState(false);
const [authError, setAuthError] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [forgotMode, setForgotMode] = useState(false);
const [resetStep, setResetStep] = useState(1);

const [resetForm, setResetForm] = useState({
  email: "",
  otp: "",
  new_password: ""
});

const [resetLoading, setResetLoading] = useState(false);
const [resetMessage, setResetMessage] = useState("");

const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const [analysisResult, setAnalysisResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(() => {
  return localStorage.getItem("aiAssistantEnabled") !== "false";
});

const [codeAnalysisEnabled, setCodeAnalysisEnabled] = useState(() => {
  return localStorage.getItem("codeAnalysisEnabled") !== "false";
});
const [passwordForm, setPasswordForm] = useState({
  current_password: "",
  new_password: "",
  confirm_password: ""
});

const [passwordMessage, setPasswordMessage] = useState("");
const [passwordLoading, setPasswordLoading] = useState(false);
const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
});
const toggleAiAssistant = () => {
  const newValue = !aiAssistantEnabled;

  setAiAssistantEnabled(newValue);
  localStorage.setItem("aiAssistantEnabled", newValue);
};

const toggleCodeAnalysis = () => {
  const newValue = !codeAnalysisEnabled;

  setCodeAnalysisEnabled(newValue);
  localStorage.setItem("codeAnalysisEnabled", newValue);
};

const toggleDarkMode = () => {
  setDarkMode((prev) => !prev);
};

  const [mode, setMode] = useState("chat");
  const [copied, setCopied] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
const [exitingSplash, setExitingSplash] = useState(false);
useEffect(() => {
  const exitTimer = setTimeout(() => {
    setExitingSplash(true);
  }, 2700);

  const removeTimer = setTimeout(() => {
    setShowSplash(false);
  }, 3500);

  return () => {
    clearTimeout(exitTimer);
    clearTimeout(removeTimer);
  };
}, []);

useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);

  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);
/* Scroll workspace to top whenever sidebar page changes */
useEffect(() => {
  const workspace = document.querySelector(".workspace");

  if (workspace) {
    workspace.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}, [activePage]);

  /* ================================
     UPLOAD CODE
  ================================= */


  
if (showSplash) {
  return (
    <SplashScreen
      exiting={exitingSplash}
    />
  );
}
const handleChangePassword = async (e) => {
  e.preventDefault();

  setPasswordMessage("");

  if (
    !passwordForm.current_password ||
    !passwordForm.new_password ||
    !passwordForm.confirm_password
  ) {
    setPasswordMessage("Please fill all password fields.");
    return;
  }

  if (
    passwordForm.new_password !==
    passwordForm.confirm_password
  ) {
    setPasswordMessage("New passwords do not match.");
    return;
  }

  if (passwordForm.new_password.length < 6) {
    setPasswordMessage(
      "New password must be at least 6 characters."
    );
    return;
  }

  setPasswordLoading(true);

  try {
    const response = await axios.post(
      "https://ai-coding-agent-backend-9uaq.onrender.com/auth/change-password",
      {
        email: user.email,
        current_password:
          passwordForm.current_password,
        new_password:
          passwordForm.new_password
      }
    );

    if (response.data.success) {
      setPasswordMessage(
        "Password changed successfully!"
      );

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
    }

  } catch (error) {
    console.error(
      "Change password error:",
      error
    );

    setPasswordMessage(
      error.response?.data?.detail ||
      "Unable to change password."
    );

  } finally {
    setPasswordLoading(false);
  }
};

const handleAuth = async (e) => {
  e.preventDefault();

  setAuthLoading(true);
  setAuthError("");

  try {
    const endpoint =
      authMode === "login"
        ? "https://ai-coding-agent-backend-9uaq.onrender.com/auth/login"
        : "https://ai-coding-agent-backend-9uaq.onrender.com/auth/register";

    const payload =
      authMode === "login"
        ? {
            email: authForm.email,
            password: authForm.password
          }
        : {
            name: authForm.name,
            email: authForm.email,
            password: authForm.password
          };

    const response = await axios.post(endpoint, payload);

    if (authMode === "login") {
      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
setUser(response.data.user);
      setIsAuthenticated(true);
    } else {
      setAuthMode("login");
      setAuthError("Account created! Please login.");
    }

  } catch (error) {
    console.error("Authentication error:", error);

    setAuthError(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Authentication failed. Please try again."
    );
  } finally {
    setAuthLoading(false);
  }
};

const handleForgotPassword = async (e) => {
  e.preventDefault();

  setResetLoading(true);
  setResetMessage("");

  try {
    const response = await axios.post(
      "https://ai-coding-agent-backend-9uaq.onrender.com/auth/forgot-password",
      {
        email: resetForm.email
      }
    );

    if (response.data.success) {
      setResetMessage(
        "OTP generated successfully. Check the backend terminal for the OTP."
      );

      setResetStep(2);
    } else {
      setResetMessage(
        response.data.message || "Unable to generate OTP."
      );
    }

  } catch (error) {
    console.error("Forgot password error:", error);

    setResetMessage(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  } finally {
    setResetLoading(false);
  }
};


const handleResetPassword = async (e) => {
  e.preventDefault();

  setResetLoading(true);
  setResetMessage("");

  try {
    const response = await axios.post(
      "https://ai-coding-agent-backend-9uaq.onrender.com/auth/reset-password",
      {
        email: resetForm.email,
        otp: resetForm.otp,
        new_password: resetForm.new_password
      }
    );

    if (response.data.success) {

      setResetMessage(
        "Password reset successfully! You can now login."
      );

      setTimeout(() => {
        setForgotMode(false);
        setResetStep(1);
        setResetMessage("");

        setAuthMode("login");

        setAuthForm({
          name: "",
          email: resetForm.email,
          password: ""
        });

        setResetForm({
          email: "",
          otp: "",
          new_password: ""
        });

      }, 1500);

    } else {
      setResetMessage(
        response.data.message ||
        "Password reset failed."
      );
    }

  } catch (error) {
    console.error("Reset password error:", error);

    setResetMessage(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Invalid or expired OTP."
    );

  } finally {
    setResetLoading(false);
  }
};


if (!isAuthenticated) {
  return (
    <div className="auth-page">

      {forgotMode ? (
  <div className="auth-card">

    <div className="auth-logo">
      AI
    </div>

    <h1>
      Reset Password
    </h1>

    <p className="auth-subtitle">
      {resetStep === 1
        ? "Enter your registered email"
        : "Enter the OTP and create a new password"
      }
    </p>


    {/* STEP 1 — EMAIL */}
    {resetStep === 1 && (

      <form onSubmit={handleForgotPassword}>

        <input
          type="email"
          placeholder="Email Address"
          value={resetForm.email}
          onChange={(e) =>
            setResetForm({
              ...resetForm,
              email: e.target.value
            })
          }
          required
        />

        {resetMessage && (
          <div className="auth-error">
            {resetMessage}
          </div>
        )}

        <button
          type="submit"
          className="auth-submit"
          disabled={resetLoading}
        >
          {resetLoading
            ? "Sending OTP..."
            : "Send OTP"
          }
        </button>

      </form>

    )}

{/* STEP 2 — OTP + NEW PASSWORD */}
{resetStep === 2 && (

  <form onSubmit={handleResetPassword}>

    <input
      type="email"
      placeholder="Email Address"
      value={resetForm.email}
      disabled
      autoComplete="off"
    />

    <input
      type="text"
      placeholder="Enter 6-digit OTP"
      maxLength="6"
      value={resetForm.otp}
      onChange={(e) =>
        setResetForm({
          ...resetForm,
          otp: e.target.value
        })
      }
      autoComplete="one-time-code"
      inputMode="numeric"
      required
    />

    <input
      type="password"
      placeholder="Enter New Password"
      value={resetForm.new_password}
      onChange={(e) =>
        setResetForm({
          ...resetForm,
          new_password: e.target.value
        })
      }
      autoComplete="new-password"
      required
    />

    {resetMessage && (
      <div className="auth-error">
        {resetMessage}
      </div>
    )}

    <button
      type="submit"
      className="auth-submit"
      disabled={resetLoading}
    >
      {resetLoading
        ? "Resetting..."
        : "Reset Password"
      }
    </button>

  </form>

)}


    <button
      type="button"
      className="forgot-password-button"
      onClick={() => {
        setForgotMode(false);
        setResetStep(1);
        setResetMessage("");
      }}
    >
      ← Back to Login
    </button>

    <div className="auth-footer">
      AI-powered developer workspace
    </div>

  </div>

) : (

  // YAHAN TUMHARA EXISTING LOGIN / REGISTER AUTH CARD HOGA



      <div className="auth-card">

        <div className="auth-logo">
          AI
        </div>

        <h1>
          AI Coding Assistant
        </h1>

        <p className="auth-subtitle">
          {authMode === "login"
            ? "Welcome back, developer"
            : "Create your developer account"
          }
        </p>

        <div className="auth-tabs">

          <button
            className={authMode === "login" ? "active" : ""}
            onClick={() => {
              setAuthMode("login");
              setAuthError("");
            }}
          >
            Login
          </button>

          <button
            className={authMode === "register" ? "active" : ""}
            onClick={() => {
              setAuthMode("register");
              setAuthError("");
            }}
          >
            Register
          </button>

        </div>

        <form onSubmit={handleAuth}>

          {authMode === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              value={authForm.name}
              onChange={(e) =>
                setAuthForm({
                  ...authForm,
                  name: e.target.value
                })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={authForm.email}
            onChange={(e) =>
              setAuthForm({
                ...authForm,
                email: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={(e) =>
              setAuthForm({
                ...authForm,
                password: e.target.value
              })
            }
            required
          />

          {authError && (
            <div className="auth-error">
              {authError}
            </div>
          )}
{authMode === "login" && (
  <button
    type="button"
    className="forgot-password-button"
    onClick={() => {
      setForgotMode(true);
      setResetStep(1);
      setResetMessage("");

      setResetForm({
        email: authForm.email,
        otp: "",
        new_password: ""
      });
    }}
  >
    <span className="forgot-icon">🔐</span>
    <span>Forgot Password?</span>
  </button>
)}

<button
  type="submit"
  className="auth-submit"
  disabled={authLoading}
>
  {authLoading
    ? "Please wait..."
    : authMode === "login"
      ? "Login"
      : "Create Account"
  }
</button>

        </form>

        <div className="auth-footer">
          AI-powered developer workspace
        </div>

      </div>
)}
    </div>
  );
}
const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  setUser(null);
  setIsAuthenticated(false);
  setMessages([]);
  setUploadedFile(null);
  setCode("");
  setLanguage("");
  setAnalysisResult(null);
};

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const allowedExtensions = [
      ".py",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".cpp",
      ".c",
      ".java"
    ];

    const fileName =
      file.name.toLowerCase();

    const isSupported =
      allowedExtensions.some(
        (extension) =>
          fileName.endsWith(extension)
      );

    if (!isSupported) {

      alert(
        "❌ Unsupported file format. Please upload a code file."
      );

      return;
    }

const formData = new FormData();

formData.append(
  "file",
  file
);

try {

  // ================================
  // STEP 1 — UPLOAD FILE
  // ================================

  const uploadResponse =
    await axios.post(
      "https://ai-coding-agent-backend-9uaq.onrender.com/upload",
      formData
    );

  console.log(
    "UPLOAD RESPONSE:",
    uploadResponse.data
  );


  // ================================
  // STEP 2 — UPDATE EDITOR
  // ================================

  setUploadedFile(
    uploadResponse.data.filename
  );

  setLanguage(
    uploadResponse.data.language
  );

  setCode(
    uploadResponse.data.content
  );

  setMessages([]);


  // ================================
  // STEP 3 — ANALYZE FILE
  // ================================

  const analysisFormData =
    new FormData();

  analysisFormData.append(
    "file",
    file
  );


  const analysisResponse =
    await axios.post(
      "https://ai-coding-agent-backend-9uaq.onrender.com/analyze",
      analysisFormData
    );


  console.log(
    "ANALYSIS RESPONSE:",
    analysisResponse.data
  );


  // ================================
  // STEP 4 — SAVE ANALYSIS
  // ================================

  setAnalysisResult(
    analysisResponse.data
  );


} catch (error) {

  console.error(
    "Upload / Analysis Error:",
    error.response?.data ||
    error.message
  );

  alert(
    "File upload or analysis failed."
  );

}

  };

const handleCopyCode = async () => {
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (error) {
    console.error("Copy failed:", error);
  }
};

  /* ================================
     SEND MESSAGE
  ================================= */

  const handleSend = async () => {

    if (!question.trim()) {
      return;
    }


    if (!uploadedFile) {

      alert(
        "Please upload a file first."
      );

      return;
    }


    const currentQuestion =
      question;


    setMessages(
      (prev) => [

        ...prev,

        {
          role: "You",
          content:
            currentQuestion
        }

      ]
    );


    setQuestion("");

    setLoading(true);


    try {


      /* ================================
         CHAT MODE
      ================================= */


      if (mode === "chat") {


        const response =
          await axios.post(

            "https://ai-coding-agent-backend-9uaq.onrender.com/chat-code",

            {
              question:
                currentQuestion
            }

          );

          console.log("CHAT RESPONSE:", response.data);

        setMessages(
          (prev) => [

            ...prev,

            {
              role: "AI",
              content:
                response.data.answer
            }

          ]
        );


      }


      /* ================================
         AGENT MODE
      ================================= */


      else {


        const formData =
          new FormData();


        formData.append(
          "task",
          currentQuestion
        );


        formData.append(
          "file",
          file
        );


        const response =
          await axios.post(

            "https://ai-coding-agent-backend-9uaq.onrender.com/agent",

            formData

          );


        setMessages(
          (prev) => [

            ...prev,

            {

              role: "AI",

              content:

                `🛠️ **Tools Used:** ${response.data.tools_used.join(", ")}

${response.data.ai_report}`

            }

          ]
        );

      }


    } catch (error) {


      console.error(

        "Error:",

        error.response?.data ||
        error.message

      );


      setMessages(
        (prev) => [

          ...prev,

          {

            role: "AI",

            content:
              "❌ Something went wrong. Check the backend terminal."

          }

        ]
      );


    } finally {

      setLoading(false);

    }

  };
  


  return (

    
    <div className="app dashboard-enter">


      {/* =================================
          TOP BAR
      ================================= */}

      <header className="topbar">


        <div className="brand">


          <div className="brand-icon">
            AI
          </div>


          <div>

            <h1>
              AI Coding Assistant
            </h1>

            <span>
              Intelligent Developer Workspace
            </span>

          </div>


        </div>


        <div className="status">

          <span className="status-dot"></span>

          Backend Online

        </div>


      </header>



      {/* =================================
          MAIN LAYOUT
      ================================= */}

      <div className="dashboard-layout">


        {/* =================================
            SIDEBAR
        ================================= */}

        <aside className="sidebar">


          {/* SIDEBAR LOGO */}

          <div className="sidebar-brand">

            <div className="sidebar-logo">
              AI
            </div>

            <span>
              Developer
            </span>

          </div>



          {/* NAVIGATION */}

          <nav className="sidebar-nav">

  <button
  className={`sidebar-item ${
    activePage === "dashboard" ? "active" : ""
  }`}
  onClick={() => setActivePage("dashboard")}
>
  <span>◈</span>
  Dashboard
</button>

  <button
  className={`sidebar-item ${
    activePage === "projects" ? "active" : ""
  }`}
  onClick={() => setActivePage("projects")}
>
  <span>◫</span>
  Projects
</button>

  <button
  className={`sidebar-item ${
    activePage === "files" ? "active" : ""
  }`}
  onClick={() => setActivePage("files")}
>
  <span>◧</span>
  Files
</button>

  <button
  className={`sidebar-item ${
    activePage === "history" ? "active" : ""
  }`}
  onClick={() => setActivePage("history")}
>
  <span>◷</span>
  History
</button>

</nav>


{/* PROJECT STATUS */}

<div className="project-status">

  <div className="project-status-title">
    PROJECT STATUS
  </div>

  <div className="project-status-row">

    <span>Backend</span>

    <span className="status-online">
      ● Online
    </span>

  </div>


  <div className="project-status-row">

    <span>File</span>

    <strong>
      {uploadedFile || "No file"}
    </strong>

  </div>


  <div className="project-status-row">

    <span>Language</span>

    <strong>
      {language || "—"}
    </strong>

  </div>


  <div className="project-status-row">

    <span>Status</span>

    <strong className={
      uploadedFile
        ? "status-ready"
        : "status-waiting"
    }>

      {uploadedFile
        ? "Ready"
        : "Waiting"
      }

    </strong>

  </div>

</div>



          {/* SIDEBAR BOTTOM */}

          <div className="sidebar-bottom">


            <button
  className={`sidebar-item ${
    activePage === "settings" ? "active" : ""
  }`}
  onClick={() => setActivePage("settings")}
>
  <span>⚙</span>
  Settings
</button>


            <div className="user-profile">
              

  <div className="user-avatar">
    {user?.name
      ? user.name
          .split(" ")
          .map(word => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "SD"
    }
  </div>

  <div>

    <strong>
      {user?.name || "Developer"}
    </strong>

    <span>
      {user?.email || "AI Workspace"}
    </span>

  </div>

</div>

<button
    className="logout-button"
    onClick={handleLogout}
  >
    <span>↪</span>
    Logout
  </button>

</div>


          
          </aside>


        

        {/* =================================
            CONTENT AREA
        ================================= */}

        
       <main className="workspace workspace-animate">

  {analysisResult?.analysis && (
    <div className="analysis-dashboard">
      
      <div className="analysis-header">

        <div>
          <span className="analysis-label">
            AI CODE REVIEW
          </span>

          <h2>
            Code Analysis
          </h2>

          <p>
            AI-powered insights for your uploaded code
          </p>
        </div>

        <div className="analysis-file">
          <span className="file-dot"></span>
          {analysisResult.filename}
        </div>

      </div>


      <div className="analysis-overview">

        <div className="quality-score-card">

          <span className="score-label">
            CODE QUALITY
          </span>

          <div className="score-circle">

            <strong>
              {analysisResult.analysis.quality_score}
            </strong>

            <span>/100</span>

          </div>

          <p>
            Overall code quality
          </p>

        </div>


        <div className="analysis-stats">

          <div className="analysis-card">
            <div className="analysis-icon">🐛</div>

            <div>
              <span>Bugs</span>

              <strong>
                {analysisResult.analysis.bugs?.length ?? 0}
              </strong>
            </div>
          </div>


          <div className="analysis-card">
            <div className="analysis-icon">⚠️</div>

            <div>
              <span>Warnings</span>

              <strong>
                {analysisResult.analysis.warnings?.length ?? 0}
              </strong>
            </div>
          </div>


          <div className="analysis-card">
            <div className="analysis-icon">⚡</div>

            <div>
              <span>Complexity</span>

              <strong>
                {analysisResult.analysis.complexity}
              </strong>
            </div>
          </div>


          <div className="analysis-card">
            <div className="analysis-icon">🔒</div>

            <div>
              <span>Security</span>

              <strong>
                {analysisResult.analysis.security}
              </strong>
            </div>
          </div>

        </div>

      </div>




      {analysisResult.analysis.bugs?.length > 0 && (

        <div className="analysis-section">

          <div className="section-title">
            <span>🐛</span>
            Issues Found
          </div>

          <div className="issue-list">

            {analysisResult.analysis.bugs.map(
              (bug, index) => (

                <div
                  className="issue-item bug-item"
                  key={index}
                >

                  <div className="issue-header">

                    <strong>
                      {bug.title}
                    </strong>

                    <span className="severity-badge">
                      {bug.severity}
                    </span>

                  </div>

                  <p>
                    {bug.description}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}


      {analysisResult.analysis.warnings?.length > 0 && (

        <div className="analysis-section">

          <div className="section-title">
            <span>⚠️</span>
            Warnings
          </div>

          <div className="issue-list">

            {analysisResult.analysis.warnings.map(
              (warning, index) => (

                <div
                  className="issue-item warning-item"
                  key={index}
                >

                  <strong>
                    {warning.title}
                  </strong>

                  <p>
                    {warning.description}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}



    </div>
  )}

  
  {activePage === "dashboard" && (
    <>
           {/* =================================
    DASHBOARD WELCOME HEADER
================================= */}

<div className="dashboard-welcome">

  <div className="welcome-content">

    <span className="welcome-eyebrow">
      AI DEVELOPER WORKSPACE
    </span>

    <h1>
  Welcome back, {user?.name || "Developer"} <span>👋</span>
</h1>

    <p>
      Analyze, debug and improve your code with your AI coding workspace.
    </p>

  </div>


  <div className="system-status-card">

    <span className="system-status-dot"></span>

    <div>
      <strong>
        System Operational
      </strong>

      <span>
         -AI services are ready
      </span>
    </div>

  </div>

</div>



          {/* =================================
              UPLOAD SECTION
          ================================= */}

          <section className="upload-card">


            <div className="upload-info">


              <div className="upload-icon">
  <span>↑</span>
</div>


              <div>

                <h2>
                  Upload your code
                </h2>

                <p>
  Upload your source code and let AI analyze, debug and improve it.
</p>

              </div>


            </div>



            <div className="upload-controls">


              <label className="file-picker">


                <input

                  type="file"

                  onChange={(e) =>
                    setFile(
                      e.target.files[0]
                    )
                  }

                />


                <div className="file-picker-content">

  <span className="file-picker-icon">
    +
  </span>

  <div>
    <strong>
      {file
        ? file.name
        : "Choose a code file"
      }
    </strong>

    <small>
      {file
        ? "File selected and ready to upload"
        : " Python, JavaScript, Java, C++, C supported"
      }
    </small>
  </div>

</div>


              </label>



              <button

                className="upload-button"

                onClick={handleUpload}

              >

               <span className="upload-button-icon">
  ↑
</span>

Upload Code

              </button>


            </div>



            {uploadedFile && (


              <div className="uploaded-status">


                <span className="success-icon">
                  ✓
                </span>


                <span>
                  {uploadedFile}
                </span>


                {language && (

                  <span className="language-badge">
                    {language}
                  </span>

                )}


              </div>


            )}


          </section>



          {/* =================================
              MAIN PANELS
          ================================= */}

          <div className="main-grid">


            {/* =================================
                CODE PANEL
            ================================= */}

            <section className="panel code-panel">

  <div className="editor-header">

    <div className="editor-file-tab">

      <span className="file-dot"></span>

      <span className="editor-file-name">
        {uploadedFile || "untitled"}
      </span>

      {uploadedFile && (
        <span className="file-check">
          ✓
        </span>
      )}

    </div>

    <div className="editor-actions">

      {language && (
        <span className="editor-language">
          {language}
        </span>
      )}

      <button
        className="copy-button"
        onClick={handleCopyCode}
        disabled={!code}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>

    </div>

  </div>


  <div className="code-preview">

    {code ? (

      <SyntaxHighlighter
        language={language?.toLowerCase()}
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>

    ) : (

      <div className="empty-code">

        <div className="empty-icon">
          {"</>"}
        </div>

        <h3>
          No code loaded
        </h3>

        <p>
          Upload a code file to view
          your source code here.
        </p>

      </div>

    )}

  </div>

</section>


            {/* =================================
                AI PANEL
            ================================= */}

            <section className="panel chat-panel">


              <div className="chat-header">


                <div className="panel-title">


                  <div className="ai-avatar">

                    AI

                  </div>


                  <div className="ai-assistant-header">
  <h2>
    AI Assistant
  </h2>

  <span>
    Analyze, debug and improve your code
  </span>
</div>


                </div>


                <span className="online-indicator">

                  ● Online

                </span>


              </div>



              {/* MODE SELECTOR */}

              <div className="mode-selector">


                <button

                  className={
                    mode === "chat"
                      ? "active-mode"
                      : ""
                  }

                  onClick={() =>
                    setMode("chat")
                  }

                >

                  💬 Chat

                </button>


                <button

                  className={
                    mode === "agent"
                      ? "active-mode"
                      : ""
                  }

                  onClick={() =>
                    setMode("agent")
                  }

                >

                  ⚡ Agent

                </button>


              </div>



              {/* MESSAGES */}

              <div className="messages">


                {messages.length === 0 && (


                  <div className="empty-chat">


                    <div className="empty-chat-icon">

                      ✦

                    </div>


                    <h3>

                      How can I help?

                    </h3>


                    <p>

                      Ask me anything about your
                      uploaded code.

                    </p>


                  </div>


                )}



                {messages.map(

                  (message, index) => (


                    <div

                      key={index}

                      className={

                        `message-row ${

                          message.role === "You"

                            ? "user-row"

                            : "ai-row"

                        }`

                      }

                    >


                      <div

                        className={

                          `message-bubble ${

                            message.role === "You"

                              ? "user-message"

                              : "ai-message"

                          }`

                        }

                      >


                        <div className="message-role">

                          {message.role === "You"

                            ? "You"

                            : "AI Assistant"

                          }

                        </div>



                        <div className="message-content">


                          {message.role === "AI" ? (


                            <ReactMarkdown>

                              {message.content}

                            </ReactMarkdown>


                          ) : (


                            message.content

                          )}


                        </div>


                      </div>


                    </div>


                  )

                )}


              </div>



              {/* LOADING */}

              {loading && (

                <div className="thinking">

                  <span className="thinking-dot"></span>

                  AI is analyzing your code...

                </div>

              )}



              {/* INPUT */}

              <div className="chat-input">


                <input

                  type="text"

                  placeholder={

                    mode === "chat"

                      ? "Ask something about your code..."

                      : "Give the AI Agent a task..."

                  }

                  value={question}

                  onChange={(e) =>
                    setQuestion(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter"
                    ) {

                      handleSend();

                    }

                  }}

                />


                <button

                  onClick={handleSend}

                  disabled={loading}

                >

                  ➤

                </button>


              </div>


            </section>


          </div>
          </>

            )}

  


  {/* =================================
    PROJECTS PAGE
================================= */}

{activePage === "projects" && (

  <section className="page-container">

    <div className="page-header">

      <div>
        <span className="page-eyebrow">
          WORKSPACE
        </span>

        <h1>
          Projects
        </h1>

        <p>
          Manage and monitor your AI-powered coding projects.
        </p>
      </div>

      <button className="primary-action">
        + New Project
      </button>

    </div>


    <div className="stats-grid">

      <div className="stat-card">
        <span className="stat-icon">◈</span>

        <div>
          <span className="stat-label">
            Total Projects
          </span>

          <strong>
            1
          </strong>
        </div>
      </div>


      <div className="stat-card">
        <span className="stat-icon">◧</span>

        <div>
          <span className="stat-label">
            Files Analyzed
          </span>

          <strong>
            {uploadedFile ? "1" : "0"}
          </strong>
        </div>
      </div>


      <div className="stat-card">
        <span className="stat-icon">✦</span>

        <div>
          <span className="stat-label">
            AI Analyses
          </span>

          <strong>
            {messages.length}
          </strong>
        </div>
      </div>


      <div className="stat-card">
        <span className="stat-icon">●</span>

        <div>
          <span className="stat-label">
            System Status
          </span>

          <strong className="status-ready">
            Online
          </strong>
        </div>
      </div>

    </div>


    <div className="project-card">

      <div className="project-card-header">

        <div className="project-main-info">

          <div className="project-icon">
            AI
          </div>

          <div>
            <h2>
              AI Coding Agent
            </h2>

            <p>
              Intelligent code analysis and debugging workspace
            </p>
          </div>

        </div>

        <span className="project-badge">
          Active
        </span>

      </div>


      <div className="project-details">

        <div>
          <span>
            Backend
          </span>

          <strong>
            FastAPI
          </strong>
        </div>


        <div>
          <span>
            AI Engine
          </span>

          <strong>
            AI Agent
          </strong>
        </div>


        <div>
          <span>
            Current File
          </span>

          <strong>
            {uploadedFile || "No file"}
          </strong>
        </div>


        <div>
          <span>
            Language
          </span>

          <strong>
            {language || "—"}
          </strong>
        </div>

      </div>

    </div>

  </section>

)}


{/* =================================
    FILES PAGE
================================= */}

{activePage === "files" && (

  <section className="page-container">

    <div className="page-header">

      <div>
        <span className="page-eyebrow">
          PROJECT FILES
        </span>

        <h1>
          Files
        </h1>

        <p>
          View and manage your uploaded source code files.
        </p>
      </div>

      <button
        className="primary-action"
        onClick={() => setActivePage("dashboard")}
      >
        + Upload File
      </button>

    </div>


    <div className="files-card">

      <div className="files-card-header">

        <div>
          <h2>
            Uploaded Files
          </h2>

          <span>
            {uploadedFile ? "1 file available" : "No files uploaded"}
          </span>
        </div>

      </div>


      {uploadedFile ? (

        <div className="file-row">

          <div className="file-row-icon">
            &lt;/&gt;
          </div>


          <div className="file-row-info">

            <strong>
              {uploadedFile}
            </strong>

            <span>
              {language || "Unknown language"} • Ready for analysis
            </span>

          </div>


          <span className="file-status">
            Ready
          </span>


          <button
            className="file-action"
            onClick={() => setActivePage("dashboard")}
          >
            Open
          </button>

        </div>

      ) : (

        <div className="empty-files">

          <div className="empty-files-icon">
            ◧
          </div>

          <h3>
            No files uploaded
          </h3>

          <p>
            Upload your first source code file to start analyzing it.
          </p>

          <button
            className="primary-action"
            onClick={() => setActivePage("dashboard")}
          >
            Upload Code
          </button>

        </div>

      )}

    </div>

  </section>

)}


{/* =================================
    HISTORY PAGE
================================= */}

{activePage === "history" && (

  <section className="page-container">

    <div className="page-header">

      <div>
        <span className="page-eyebrow">
          ACTIVITY
        </span>

        <h1>
          History
        </h1>

        <p>
          Review your recent AI coding sessions and activity.
        </p>
      </div>

    </div>


    <div className="history-card">

      {messages.length > 0 ? (

        messages.map((message, index) => (

          <div
            className="history-item"
            key={index}
          >

            <div className="history-icon">
              {message.role === "You" ? "→" : "✦"}
            </div>

            <div className="history-content">

              <strong>
                {message.role === "You"
                  ? "Code Analysis Request"
                  : "AI Assistant Response"
                }
              </strong>

              <p>
                {message.content.length > 120
                  ? message.content.substring(0, 120) + "..."
                  : message.content
                }
              </p>

            </div>

            <span className="history-time">
              Recent
            </span>

          </div>

        ))

      ) : (

        <div className="empty-history">

          <div className="empty-history-icon">
            ◷
          </div>

          <h3>
            No activity yet
          </h3>

          <p>
            Your AI coding sessions will appear here.
          </p>

        </div>

      )}

    </div>

  </section>

)}


{/* =================================
    SETTINGS PAGE
================================= */}
{activePage === "settings" && (

  <section className="page-container">

    <div className="page-header">

      <div>
        <span className="page-eyebrow">
          PREFERENCES
        </span>

        <h1>
          Settings
        </h1>

        <p>
          Configure your AI Coding Agent workspace.
        </p>
      </div>

    </div>


    <div className="settings-card">
{/* PROFILE SETTINGS */}

<div className="settings-section settings-profile">

  <div className="settings-info">
    <h3>
      Profile
    </h3>

    <p>
      Manage your personal information and account details.
    </p>
  </div>

  <div className="profile-settings-form">

    <input
      type="text"
      placeholder="Your Name"
      value={user?.name || ""}
      onChange={(e) =>
        setUser({
          ...user,
          name: e.target.value
        })
      }
    />

    <input
      type="email"
      placeholder="Email Address"
      value={user?.email || ""}
      disabled
    />

    <button
      className="settings-save-button"
      onClick={() => {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        alert("Profile updated successfully!");
      }}
    >
      Save Profile
    </button>

  </div>

</div>

{/* CHANGE PASSWORD */}

<div className="settings-section settings-password">

  <div className="settings-info">
    <h3>
      Change Password
    </h3>

    <p>
      Update your account password to keep your workspace secure.
    </p>
  </div>

  <form
    className="password-settings-form"
    onSubmit={handleChangePassword}
  >

    <input
      type="password"
      placeholder="Current Password"
      value={passwordForm.current_password}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          current_password: e.target.value
        })
      }
      autoComplete="current-password"
      required
    />

    <input
      type="password"
      placeholder="New Password"
      value={passwordForm.new_password}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          new_password: e.target.value
        })
      }
      autoComplete="new-password"
      required
    />

    <input
      type="password"
      placeholder="Confirm New Password"
      value={passwordForm.confirm_password}
      onChange={(e) =>
        setPasswordForm({
          ...passwordForm,
          confirm_password: e.target.value
        })
      }
      autoComplete="new-password"
      required
    />

    {passwordMessage && (
      <div className="settings-password-message">
        {passwordMessage}
      </div>
    )}

    <button
      type="submit"
      className="settings-save-button"
      disabled={passwordLoading}
    >
      {passwordLoading
        ? "Updating..."
        : "Update Password"
      }
    </button>

  </form>

</div> 
      {/* AI ASSISTANT */}

      <div className="settings-section">

        <div className="settings-info">
          <h3>
            AI Assistant
          </h3>

          <p>
            Configure how the AI assistant interacts with your code.
          </p>
        </div>

        <button
          className={`settings-toggle ${
            aiAssistantEnabled ? "active" : ""
          }`}
          onClick={toggleAiAssistant}
        >
          <span className="toggle-circle"></span>
        </button>

      </div>


      {/* CODE ANALYSIS */}

      <div className="settings-section">

        <div className="settings-info">
          <h3>
            Automatic Code Analysis
          </h3>

          <p>
            Automatically analyze uploaded source code.
          </p>
        </div>

        <button
          className={`settings-toggle ${
            codeAnalysisEnabled ? "active" : ""
          }`}
          onClick={toggleCodeAnalysis}
        >
          <span className="toggle-circle"></span>
        </button>

      </div>


      {/* APPEARANCE */}

      <div className="settings-section">

        <div className="settings-info">
          <h3>
            Dark Mode
          </h3>

          <p>
            Use a darker interface for comfortable coding.
          </p>
        </div>

        <button
          className={`settings-toggle ${
            darkMode ? "active" : ""
          }`}
          onClick={toggleDarkMode}
        >
          <span className="toggle-circle"></span>
        </button>

      </div>


      {/* WORKSPACE STATUS */}

      <div className="settings-section">

        <div className="settings-info">
          <h3>
            Workspace
          </h3>

          <p>
            AI Coding Agent development environment.
          </p>
        </div>

        <span className="settings-status">
          Ready
        </span>

      </div>

    </div>

  </section>

)}

    </main>

      


      </div>


    </div>

  );

}

export default App;
