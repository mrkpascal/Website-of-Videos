
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. Chatbot functionality will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Hello! It seems the Gemini API key is missing. I'm currently running in offline mode.";
  }
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: `You are a helpful and friendly assistant in a video streaming platform's chat room. Keep your responses concise and engaging. User's message: "${userMessage}"`,
        config: {
            temperature: 0.7,
            topP: 1,
            topK: 1,
            maxOutputTokens: 150,
        },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
