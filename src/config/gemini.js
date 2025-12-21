import GeminiClient from "../library/geminiClient.js";

async function runChat(prompt, modelName = "gemini-2.5-flash") {
  if (!prompt?.trim()) return "Prompt is empty.";

  try {
    const ai = GeminiClient.getInstance();
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.candidates[0].content.parts[0].text;
  } catch (err) {
    return "⚠️ API Error";
  }
}

export default runChat;
