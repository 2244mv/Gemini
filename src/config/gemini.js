import GeminiClient from "../library/geminiClient.js";

async function runChat(prompt, modelName = "gemini-2.5-flash") {
  if (
    !prompt ||
    (typeof prompt === "string" ? prompt.trim() === "" : prompt.length === 0)
  ) {
    return "Error: Prompt is empty.";
  }

  try {
    const ai = GeminiClient.getInstance();

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt, // can be string or array for chat history
    });
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (
      error.message.includes("API key") ||
      error.message.includes("browser")
    ) {
      return "Error: Cannot use Gemini API key directly in browser. Use a backend proxy in production.";
    }

    return `Error: ${error.message || "Something went wrong."}`;
  }
}

export default runChat;
