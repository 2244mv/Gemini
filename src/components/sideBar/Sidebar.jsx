import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { previousPrompt, onSent, setInput, newChat } = useContext(Context);
  const [extended, setExtended] = useState(false);

  const loadPrompt = async (prompt) => {
    setInput(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "expanded" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="Plus" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((item, index) => (
              <div
                key={index}
                className="recent-entry"
                onClick={() => loadPrompt(item)}
              >
                <img src={assets.message_icon} alt="Message" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History" />
          {extended && <p>History</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
