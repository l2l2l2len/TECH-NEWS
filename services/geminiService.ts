/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PAPERS } from '../constants';
import { ChatMessage } from "../types";

const getSystemInstruction = () => {
  const paperContext = PAPERS.map(p => 
    `- "${p.title}" (${p.publicationDate}). Section: ${p.category}. Lead: ${p.abstractPreview}`
  ).join('\n');

  return `You are the Executive Editor for "The Tech Times", a prestigious technology newspaper. 
  Your tone is authoritative, intelligent, slightly traditional yet forward-looking (like a mix of The New York Times and Wired).
  
  Here is our current news wire:
  ${paperContext}
  
  Answer user questions about these stories. Summarize complex tech topics into clear, journalistic prose.
  If asked about topics not in the wire, provide general tech knowledge but mention you are checking the archives.
  Keep answers brief (under 3-4 sentences) and professional.`;
};

// Use export to expose functionality
export const sendMessageToGemini = async (history: Omit<ChatMessage, 'timestamp'>[]): Promise<string> => {
  try {
    // API key check. Direct access of process.env.API_KEY is preferred.
    if (!process.env.API_KEY) {
      return "I cannot access the news archives at this moment. (Missing API Key)";
    }

    // Always use initialization as requested.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent via ai.models
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    // Directly access text property from response.
    return response.text || "The editorial board is unable to comment at this time.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our archives are currently undergoing maintenance. Please check back later.";
  }
};