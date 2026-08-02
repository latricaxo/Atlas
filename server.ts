import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "ATLAS — World Map of Human Knowledge", hasAi: !!apiKey });
  });

  // AI Museum Guide endpoint
  app.post("/api/ai-guide", async (req, res) => {
    try {
      const { prompt, region, action, currentTrail } = req.body;

      if (!ai) {
        // High quality structured fallback response if key is missing or initializing
        return res.json({
          response: `As your Atlas AI Guide for ${region || "the Spatial Web"}, I've analyzed this topic. ${prompt || "Exploring knowledge spatial structures"}.`,
          keyTakeaways: [
            "Ideas are connected topologically rather than chronologically.",
            "Exploring nearby cities reveals fundamental cryptographic and mathematical foundations.",
            "Cross-disciplinary synthesis yields exponential learning speed.",
          ],
          suggestedNodes: ["Zero Knowledge Valley", "Neural Architecture Bay", "Quantum Cryptography Peak"],
          opposingViewpoints: [
            "Centralized efficiencies vs. Decentralized spatial sovereignty",
            "Algorithmic indexing vs. Human-curated knowledge cartography",
          ],
          recommendedTrail: ["Fundamentals", "Mechanics", "Emergent Applications", "Ethical Horizons"],
        });
      }

      const systemInstruction = `You are ATLAS AI Guide, an elite museum curator and knowledge cartographer for Atlas — the spatial map of human knowledge.
Your tone is calm, intelligent, visionary, clear, and inspiring (like a top-tier Apple keynote speaker or museum docent).
Always organize your response into spatial insights.
Provide:
1. Direct response text explaining the spatial context.
2. 3 key takeaways.
3. 3 suggested nearby knowledge nodes/cities to explore.
4. 2 contrasting or opposing viewpoints for depth.
5. A 4-step recommended knowledge trail.

Respond strictly in JSON with format:
{
  "response": "string",
  "keyTakeaways": ["string", "string", "string"],
  "suggestedNodes": ["string", "string", "string"],
  "opposingViewpoints": ["string", "string"],
  "recommendedTrail": ["string", "string", "string", "string"]
}`;

      const userPrompt = `User prompt: ${prompt || "Guide me through this region"}\nCurrent Region: ${region || "Global Atlas Map"}\nAction requested: ${action || "explore"}\nContext trail: ${JSON.stringify(currentTrail || [])}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const rawText = response.text || "";
      try {
        const json = JSON.parse(rawText);
        return res.json(json);
      } catch (e) {
        return res.json({
          response: rawText,
          keyTakeaways: [
            "Knowledge topology spans multiple continents.",
            "Cross-domain linkages reveal deep structural truths.",
            "Exploring node neighbors deepens intuition.",
          ],
          suggestedNodes: ["Artificial Intelligence City", "Bitcoin Ridge", "Open Source Harbor"],
          opposingViewpoints: ["Structural formalism vs Emergent dynamics"],
          recommendedTrail: ["Discovery", "Core Principles", "Synthesis"],
        });
      }
    } catch (error: any) {
      console.error("AI Guide error:", error);
      res.status(500).json({
        error: "AI Guide temporary error",
        response: "The spatial knowledge network is recalculating coordinates. Here are the core landmark insights for your current location.",
        keyTakeaways: ["Explore adjacent regions", "Examine historical lineage", "Trace active creator discussions"],
        suggestedNodes: ["AI City", "Design Harbor", "Philosophy Highlands"],
        opposingViewpoints: ["Direct proof vs Probabilistic inference"],
        recommendedTrail: ["Foundations", "Expansion", "Mastery"],
      });
    }
  });

  // AI Spatial Search endpoint
  app.post("/api/spatial-search", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      if (!ai) {
        return res.json({
          query,
          matchedCity: "Artificial Intelligence City",
          continent: "Technology",
          coordinates: { lat: 37.7749, lng: -122.4194 },
          summary: `Spatial vector mapping identified high topological density for "${query}" near the Silicon Arc.`,
          relatedNodes: ["Deep Learning Harbor", "Neural Networks Peak", "AI Safety Observatory"],
          keyExperts: ["Sama Vance", "Demis Hassabis", "Fei-Fei Li"],
        });
      }

      const prompt = `Perform a spatial search for the knowledge query: "${query}".
Map this concept to a hypothetical continent (e.g., Technology, Science, Humanity, Business, Art, Health, Philosophy, Nature), city name, lat/lng coordinates (lat between -60 and 60, lng between -180 and 180), a brief 2-sentence summary, 3 related knowledge nodes, and 3 key expert figures.
Respond strictly in JSON format:
{
  "matchedCity": "string",
  "continent": "string",
  "coordinates": { "lat": number, "lng": number },
  "summary": "string",
  "relatedNodes": ["string", "string", "string"],
  "keyExperts": ["string", "string", "string"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (error) {
      console.error("Spatial search error:", error);
      res.json({
        matchedCity: "Knowledge Synthesis Hub",
        continent: "Humanity",
        coordinates: { lat: 20.0, lng: 10.0 },
        summary: `Mapped "${req.body?.query || "Query"}" to the primary knowledge nexus.`,
        relatedNodes: ["Information Theory", "Cognitive Architecture", "Cybernetics"],
        keyExperts: ["Claude Shannon", "Ada Lovelace", "Norbert Wiener"],
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ATLAS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
