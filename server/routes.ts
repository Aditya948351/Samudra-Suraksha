import type { Express } from "express";
import { chatWithGemini, analyzeCoastlineData } from "./gemini";

export function registerRoutes(app: Express) {
  // Gemini chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await chatWithGemini(message, history);
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Agent mode - coastline analysis endpoint
  app.post("/api/analyze-coastline", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      const response = await analyzeCoastlineData(query);
      res.json({ response });
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze coastline data" });
    }
  });
}
