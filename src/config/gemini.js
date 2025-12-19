import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDI1D-qjzY5OILmZN4ZGlQOEGOsalqMt9A",
});

const runChat = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.candidates[0].content.parts[0].text;
};

export default runChat;

