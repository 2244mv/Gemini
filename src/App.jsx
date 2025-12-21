import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import ContextProvider from "./context/Context";
import "./index.css";

function App() {
  return (
    <ContextProvider>
      <div className="app-container">
        {" "}
        {/* Dark mode toggled on this */}
        <Sidebar />
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;
