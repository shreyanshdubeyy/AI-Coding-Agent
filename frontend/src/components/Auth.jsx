import { useState } from "react";
import axios from "axios";

function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const response = await axios.post(
          `${API_URL}/auth/register`,
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success) {
          alert("Account created successfully! Please login.");

          setIsRegister(false);
          setName("");
          setPassword("");
        }
      } else {
        const response = await axios.post(
          `${API_URL}/auth/login`,
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          localStorage.setItem(
            "access_token",
            response.data.access_token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );

          onLogin(response.data.user);
        }
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-logo">
            AI
          </div>

          <h1>
            {isRegister
              ? "Create your account"
              : "Welcome back"}
          </h1>

          <p>
            {isRegister
              ? "Start building smarter with AI Coding Agent"
              : "Sign in to continue to your AI Coding Agent"}
          </p>

        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <div className="auth-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>
          )}

          <div className="auth-field">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="auth-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Sign In"}
          </button>

        </form>

        <div className="auth-switch">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister
              ? "Sign In"
              : "Create Account"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Auth;