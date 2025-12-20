import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { newChat } = useContext(Context);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      <div className="top">
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="menu"
          onClick={() => setExpanded(!expanded)}
        />

        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="Plus" />
          {expanded && <p>New Chat</p>}
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Help" />
          {expanded && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Settings" />
          {expanded && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
