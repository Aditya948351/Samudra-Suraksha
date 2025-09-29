import type { Express } from "express";
import { chatWithGemini, analyzeCoastlineData } from "./gemini";

export function registerRoutes(app: Express) {
  // Placeholder reports endpoint for offline sync
  app.post("/api/reports", async (req, res) => {
    try {
      const reportData = req.body;
      console.log("Report received:", reportData);
      // TODO: Save to database
      res.json({ success: true, id: Date.now() });
    } catch (error) {
      console.error("Report save error:", error);
      res.status(500).json({ error: "Failed to save report" });
    }
  });

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
