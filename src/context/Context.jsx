import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput(""); // clear input when starting new chat
    setResultData("");
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    setShowResult(true);
    setLoading(true);

    try {
      const response = await runChat(prompt);
      setResultData(response);
      setRecentPrompt(prompt);
      setPreviousPrompt((prev) => [...prev, prompt]);
    } catch (error) {
      setResultData("⚠️ Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      // Do NOT clear input here — icon visibility depends on input
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    previousPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
