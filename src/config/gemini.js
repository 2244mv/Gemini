import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDgSFiRh_ihj3gqGT-eosiYDVIkErzvV-I",
});

const runChat = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.candidates[0].content.parts[0].text;
};

export default runChat;

