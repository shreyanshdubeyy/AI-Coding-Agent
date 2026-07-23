import React, { useEffect, useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ exiting }) {
  const [status, setStatus] = useState("Initializing AI Engine...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus("Loading Coding Tools...");
    }, 900);

    const timer2 = setTimeout(() => {
      setStatus("Analyzing Code Intelligence...");
    }, 1800);

    const timer3 = setTimeout(() => {
      setStatus("Agent Ready");
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={`splash-screen ${exiting ? "splash-exit" : ""}`}>

      {/* Animated Background */}
      <div className="splash-grid"></div>

      <div className="splash-glow glow-one"></div>
      <div className="splash-glow glow-two"></div>

      {/* Floating Particles */}
      <div className="particle particle-one"></div>
      <div className="particle particle-two"></div>
      <div className="particle particle-three"></div>
      <div className="particle particle-four"></div>
      <div className="particle particle-five"></div>

      <div className="splash-content">

        {/* AI Logo */}
        <div className="ai-logo-wrapper">

          <div className="ai-logo-ring"></div>

          <div className="ai-logo">
            <span>&lt;/&gt;</span>
          </div>

        </div>

        {/* App Name */}
        <h1>
          AI <span>Coding Agent</span>
        </h1>

        {/* Subtitle */}
        <p className="splash-subtitle">
          Your Intelligent Coding Assistant
        </p>

        {/* Loading */}
        <div className="loading-container">

          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>

          <div className="loading-status">
            <span className="status-dot"></span>
            {status}
          </div>

        </div>

      </div>

      {/* Bottom Text */}
      <div className="splash-footer">
        Powered by Artificial Intelligence
      </div>

    </div>
  );
}