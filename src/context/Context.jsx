import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Start new chat
  const newChat = () => {
    setInput("");
    setShowResult(false);
    setLoading(false);
    setResultData("");
    setRecentPrompt("");
  };

  // Send prompt to Gemini API
  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    setShowResult(true);
    setLoading(true);

    try {
      const response = await runChat(prompt);
      setResultData(response);
      setRecentPrompt(prompt);
    } catch (error) {
      console.error(error);
      setResultData("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput(""); // clear input after sending
    }
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
