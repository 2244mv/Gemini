import { GoogleGenAI } from "@google/genai";

class GeminiClient {
  static #instance = null;

  constructor() {
    throw new Error("Use GeminiClient.getInstance()");
  }

  static getInstance() {
    if (!GeminiClient.#instance) {
      const apiKey = import.meta.env?.VITE_GEMINI_KEY;

      if (!apiKey) {
        throw new Error(
          "Gemini API key is missing! Add VITE_GEMINI_KEY=your_key to .env.local"
        );
      }

      GeminiClient.#instance = new GoogleGenAI({ apiKey });
    }

    return GeminiClient.#instance;
  }
}

export default GeminiClient;
