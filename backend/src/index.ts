import { cors } from "@elysiajs/cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { SYSTEM_PROMPT } from "./prompt";

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is not defined. Please set it in your .env file."
  );
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: SYSTEM_PROMPT,
});

const app = new Elysia()
  // Add rate limiting: 10 requests per minute per IP
  .use(
    rateLimit({
      max: 10,
      duration: 60 * 1000, // 1 minute
    })
  )
  .use(
    cors({
      origin: "http://localhost:5173", // Allow frontend origin
      methods: ["POST"],
    })
  )
  .onError(({ code, error }) => {
    return new Response(error.toString(), { status: 500 });
  })
  .post(
    "/moderate",
    async ({ body }) => {
      const { message } = body;

      const prompt = `INPUT: "Message: \"${message}\""`;

      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // Clean the response from markdown and extra spaces
        text = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        // Parse the JSON string into an object
        const jsonResponse = JSON.parse(text);
        return jsonResponse;
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get moderation result from AI.");
      }
    },
    {
      body: t.Object({
        message: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
