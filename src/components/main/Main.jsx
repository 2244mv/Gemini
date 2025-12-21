import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.querySelector(".app-container");
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  const handleSend = () => {
    if (input.trim()) onSent(input);
  };

  const formatResponse = (text) => {
    if (!text) return [];
    return text.split("\n").map((line, idx) => <p key={idx}>{line}</p>);
  };

  // Toggle theme
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>

        <div className="profile-container">
          <img src={assets.user_icon} alt="User" />

          <div className="theme-toggle-container">
            <span
              className="theme-toggle"
              title={darkMode ? "Light Mode" : "Dark Mode"}
              onClick={toggleTheme}
            >
              {darkMode ? "🌞" : "🌙"}
            </span>
            <span className="theme-label" onClick={toggleTheme}>
              {darkMode ? "Dark" : "Light"}
            </span>
          </div>
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places for an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div className="card">
                <p>Improve the readability of this code</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <p className="result-prompt">{recentPrompt}</p>
            <div className="formatted-response">
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                formatResponse(resultData)
              )}
            </div>
          </div>
        )}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery" />
            <img src={assets.mic_icon} alt="Mic" />
            {input?.trim().length > 0 && (
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSend}
                className="send-icon"
                data-show="true"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
