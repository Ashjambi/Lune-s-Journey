
import { GoogleGenAI } from "@google/genai";
import { Category, Language } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLunaWordStory = async (theme: string, words: string[], lang: Language = 'en'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Luna the Owl, a Montessori guide.
                 Create a VERY SHORT 2-sentence story for a child about "${theme}".
                 Use these words: ${words.join(", ")}.
                 Language: ${lang === 'ar' ? 'Arabic' : 'English'}.
                 Keep it magical and simple.`,
      config: { temperature: 0.8 }
    });
    return response.text || `Let's learn about ${theme} together!`;
  } catch (error) {
    return `Let's explore ${theme}!`;
  }
};

export const getLunaEncouragement = async (theme: string, lang: Language = 'en'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give a 1-sentence enthusiastic encouragement for a child learning about "${theme}". 
                 Language: ${lang === 'ar' ? 'Arabic' : 'English'}.`,
    });
    return response.text || "You are doing great!";
  } catch (error) {
    return "Great job!";
  }
};
