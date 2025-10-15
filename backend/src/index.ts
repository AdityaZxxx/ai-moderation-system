import { Elysia, t } from "elysia";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined. Please set it in your .env file.");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const app = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString(), { status: 500 });
  })
  .post("/moderate", async ({ body }) => {
    const { message } = body;

    const prompt = `
      You are an advanced AI content moderator for a live streaming platform. Your task is to analyze a user's message and determine if it contains any offensive content.
      Analyze the following message: "${message}"

      Based on your analysis, you MUST return a JSON object with the following structure, and nothing else. Do not add any introductory text or markdown formatting.
      {
        "is_offensive": boolean,
        "toxicity_level": "None" | "Low" | "Medium" | "High" | "Severe",
        "offending_words": string[],
        "reason": string,
        "suggested_action": "ALLOW" | "REVIEW" | "BLOCK"
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean the response from markdown and extra spaces
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      // Parse the JSON string into an object
      const jsonResponse = JSON.parse(text);
      return jsonResponse;

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to get moderation result from AI.");
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);