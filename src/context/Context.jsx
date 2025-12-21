import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const cleanGeminiText = (text) => {
  if (!text) return "";

  let result = "";
  let i = 0;

  while (i < text.length) {
    // remove **
    if (text[i] === "*" && text[i + 1] === "*") {
      i += 2;
    }
    // remove *
    else if (text[i] === "*") {
      i += 1;
    }
    // keep normal characters
    else {
      result += text[i];
      i++;
    }
  }

  return result;
};

/* ---------- Capitalize sentences ---------- */
const capitalizeSentences = (text) => {
  if (!text) return "";
  return text
    .split(/([.!?]\s)/) // split by sentence endings
    .map((segment) =>
      segment.length > 0
        ? segment.charAt(0).toUpperCase() + segment.slice(1)
        : ""
    )
    .join("");
};

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [history, setHistory] = useState([]);

  const newChat = () => {
    setInput("");
    setShowResult(false);
    setLoading(false);
    setResultData("");
    setRecentPrompt("");
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    // Capitalize first letter of prompt
    const formattedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);

    setShowResult(true);
    setLoading(true);

    try {
      const response = await runChat(formattedPrompt);

      // Clean Gemini Markdown
      let cleanedResponse = cleanGeminiText(response);
      cleanedResponse = capitalizeSentences(cleanedResponse);

      setResultData(cleanedResponse);
      setRecentPrompt(formattedPrompt);

      // Add to history (limit 5 items)
      setHistory((prev) => {
        const newHistory = [
          { prompt: formattedPrompt, response: cleanedResponse },
          ...prev,
        ];
        if (newHistory.length > 5) newHistory.pop();
        return newHistory;
      });
    } catch (error) {
      console.error(error);
      setResultData("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const loadHistory = (item) => {
    setInput(item.prompt);
    setRecentPrompt(item.prompt);
    setResultData(item.response);
    setShowResult(true);
  };

  const deleteHistory = (index) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
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
        history,
        loadHistory,
        deleteHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
