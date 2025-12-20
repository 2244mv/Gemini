import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const { input, setInput, recentPrompt, showResult, loading, resultData, onSent } =
    useContext(Context);

  const handleSend = () => {
    if (input.trim()) onSent(input);
  };

  // ------------------- Format Response with Nested Bullets -------------------
  const formatResponse = (text) => {
    if (!text) return [];

    const lines = text.split("\n");
    const formatted = [];
    const listStack = []; // Track nested levels

    for (let line of lines) {
      line = line.trim();
      if (line === "") continue;

      // ---------------- Headings ----------------
      if (line.startsWith("### ")) {
        formatted.push(<h2 key={formatted.length}>{line.replace("### ", "")}</h2>);
        continue;
      } else if (line.startsWith("## ")) {
        formatted.push(<h3 key={formatted.length}>{line.replace("## ", "")}</h3>);
        continue;
      } else if (line.startsWith("** ")) {
        formatted.push(<b key={formatted.length}>{line.replace("**", "")}</b>);
        continue;
      }
      
      // ---------------- Nested Bullets ----------------
      const match = line.match(/^(-+)\s+(.*)/);
      if (match) {
        const level = match[1].length; // Number of "-" determines level
        const content = match[2];

        // Close lists if current level < stack length
        while (listStack.length > level) {
          listStack.pop();
        }

        // Open new lists if current level > stack length
        while (listStack.length < level) {
          const ul = <ul key={formatted.length + listStack.length} style={{ paddingLeft: `${20 * listStack.length}px` }}></ul>;
          if (listStack.length === 0) formatted.push(ul);
          listStack.push(ul);
        }

        // Add list item
        formatted.push(<li key={formatted.length}>{content}</li>);
        continue;
      }

      // ---------------- Paragraph ----------------
      // Close any open list stack
      listStack.length = 0;
      formatted.push(<p key={formatted.length}>{line}</p>);
    }

    return formatted;
  };

  return (
    <div className="main">
      {/* NAVBAR */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      {/* MAIN CONTENT */}
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

      {/* BOTTOM INPUT BAR */}
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
              <img src={assets.send_icon} alt="Send" onClick={handleSend} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
