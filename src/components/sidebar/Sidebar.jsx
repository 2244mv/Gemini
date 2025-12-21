import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { darkMode, newChat, history, loadHistory, deleteHistory } =
    useContext(Context);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      <div className="top">
        {/* Menu Icon */}
        <img
          src={darkMode ? assets.menu_icon_dark : assets.menu_icon}
          alt="Menu"
          className="menu"
          onClick={() => setExpanded(!expanded)}
        />

        {/* New Chat */}
        <div className="new-chat" onClick={newChat}>
          <img
            src={darkMode ? assets.plus_icon_dark : assets.plus_icon}
            alt="Plus"
          />
          {expanded && <p>New Chat</p>}
        </div>

        {/* History Heading */}
        {expanded && history.length > 0 && (
          <p className="history-title">History</p>
        )}

        {/* History Items */}
        {expanded && history.length > 0 && (
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="history-item">
                <p onClick={() => loadHistory(item)}>{item.prompt}</p>
                <span className="delete-btn" onClick={() => deleteHistory(idx)}>
                  ❌
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <img
            src={darkMode ? assets.question_icon_dark : assets.question_icon}
            alt="Help"
          />
          {expanded && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img
            src={darkMode ? assets.setting_icon_dark : assets.setting_icon}
            alt="Settings"
          />
          {expanded && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
