import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithGemini(message: string, conversationHistory: any[] = []): Promise<string> {
  try {
    const systemPrompt = `You are a helpful AI assistant for Samudra Sachet, a coastal hazard reporting platform. 
You help citizens report hazards, understand coastal safety, and provide guidance on:
- How to report coastal hazards (high waves, flooding, tsunami signs, abnormal tides)
- Coastal safety tips and emergency procedures
- Understanding hazard types and their dangers
- What information to include in reports
- When to evacuate and seek safety

Be concise, helpful, and prioritize safety. If asked about technical features, guide users through the reporting process.`;

    const contents = conversationHistory.length > 0 
      ? conversationHistory 
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: contents,
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}

export async function analyzeCoastlineData(query: string): Promise<string> {
  try {
    const systemPrompt = `You are an expert coastal analyst for INCOIS (Indian National Centre for Ocean Information Services).
Provide detailed, accurate information about:
- Indian coastline geography and characteristics
- Coastal hazard patterns and seasonal variations
- Historical coastal disaster data
- Regional vulnerability assessments
- Safety protocols and emergency response procedures

Base your responses on scientific principles and focus on the Indian coastline.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: query,
    });

    return response.text || "Unable to analyze coastline data at this time.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Analysis service temporarily unavailable.";
  }
}
