import dotenv from "dotenv";

dotenv.config();

console.log("GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
console.log("API Key (first 20 chars):", process.env.GEMINI_API_KEY?.substring(0, 20) + "...");
console.log("Full key length:", process.env.GEMINI_API_KEY?.length);
