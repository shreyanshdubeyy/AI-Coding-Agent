import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
const [language, setLanguage] = useState("");
const [mode, setMode] = useState("chat");

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

const fileName = file.name.toLowerCase();

const isSupported = allowedExtensions.some(
  (extension) => fileName.endsWith(extension)
);

if (!isSupported) {
  alert(
    "❌ Unsupported file format. Please upload a code file."
  );
  return;
}

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setUploadedFile(response.data.filename);
setLanguage(response.data.language);
setCode(response.data.content);
setMessages([]);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const handleSend = async () => {

  if (!question.trim()) {
    return;
  }

  if (!uploadedFile) {
    alert("Please upload a file first.");
    return;
  }

  const currentQuestion = question;

  // Show user's message
  setMessages((prev) => [
    ...prev,
    {
      role: "You",
      content: currentQuestion
    }
  ]);

  // Clear input
  setQuestion("");

  // Show loading
  setLoading(true);

  try {

    // =========================
    // CHAT MODE
    // =========================

    if (mode === "chat") {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat-code",
        {
          question: currentQuestion
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "AI",
          content: response.data.answer
        }
      ]);

    }

    // =========================
    // AGENT MODE
    // =========================

    else {

      const formData = new FormData();

      formData.append(
        "task",
        currentQuestion
      );

      formData.append(
        "file",
        file
      );

      const response = await axios.post(
        "http://127.0.0.1:8000/agent",
        formData
      );

      setMessages((prev) => [
  ...prev,
  {
    role: "AI",
    content: `🛠️ **Tools Used:** ${response.data.tools_used.join(", ")}\n\n${response.data.ai_report}`
  }
]);

    }

  } catch (error) {

    console.error(
      "Error:",
      error.response?.data || error.message
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "AI",
        content:
          "❌ Something went wrong. Check the backend terminal."
      }
    ]);

  } finally {

    setLoading(false);

  }

};

    


  return (
  <div className="app">

    <h1>🤖 AI Coding Assistant</h1>

    {/* Upload Bar */}
    <div className="upload-bar">

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Code
      </button>

      {uploadedFile && (
        <span>
          ✅ {uploadedFile}
        </span>
      )}

    </div>


    {/* Main Container */}
    <div className="container">

      {/* LEFT SIDE - CODE */}
      <div className="code-section">

        <div className="panel-header">

          <h2>
            📄 {uploadedFile || "Code Preview"}
          </h2>

          {language && (
            <span className="language-badge">
              {language}
            </span>
          )}

        </div>


        <div className="code-preview">

          {code ? (
            <pre>
              <code>{code}</code>
            </pre>
          ) : (
            <div className="empty-code">
              Upload a code file to view it here.
            </div>
          )}

        </div>

      </div>


      {/* RIGHT SIDE - CHAT */}
      <div className="chat-section">

        <h2>💬 AI Coding Assistant</h2>
       <div className="mode-selector">

  <button
    className={mode === "chat" ? "active-mode" : ""}
    onClick={() => setMode("chat")}
  >
    💬 Chat
  </button>

  <button
    className={mode === "agent" ? "active-mode" : ""}
    onClick={() => setMode("agent")}
  >
    🤖 Agent
  </button>

</div>


        {/* Messages */}
        <div className="messages">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`message-row ${
                message.role === "You"
                  ? "user-row"
                  : "ai-row"
              }`}
            >

              <div
                className={`message-bubble ${
                  message.role === "You"
                    ? "user-message"
                    : "ai-message"
                }`}
              >

                <div className="message-role">
                  {message.role === "You"
                    ? "👤 You"
                    : "🤖 AI"}
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

          ))}

        </div>


        {/* Loading */}
        {loading && (
          <div className="thinking">
            🤖 AI is analyzing your code...
          </div>
        )}


        {/* Chat Input */}
        <div className="chat-input">

          <input
            type="text"
            placeholder="Ask something about your code..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button onClick={handleSend}>
            Send
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default App;