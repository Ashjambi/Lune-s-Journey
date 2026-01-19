
import { GoogleGenAI } from "@google/genai";
import { Category } from "../types.ts";

export const getLunaEncouragement = async (category: Category, theme: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Luna the Owl, a friendly Montessori guide for children. 
                 The child just watched a video about "${theme}" in the category of "${category}".
                 Give them a short, cheerful, 1-sentence encouragement in English starting with "I see you love...". 
                 Keep it simple and sweet.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });
    return response.text || `I see you love ${theme}! Ready to learn new words?`;
  } catch (error) {
    return `I see you love ${theme}! Ready to learn new words?`;
  }
};
