import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables FIRST before reading them
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;

console.log("🔑 API Key Status:", apiKey ? "✅ Found" : "❌ NOT FOUND");

let genAI;
let model;
const modelCandidates = (
  process.env.GEMINI_MODEL_CANDIDATES
    ? process.env.GEMINI_MODEL_CANDIDATES.split(",").map((name) => name.trim()).filter(Boolean)
    : ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash-latest", "gemini-flash-latest", "gemini-1.5-flash"]
);
let activeModelIndex = 0;
let modelName = modelCandidates[activeModelIndex];
let initializationError = null;

function setActiveModelByIndex(index) {
  activeModelIndex = index;
  modelName = modelCandidates[activeModelIndex];
  model = genAI.getGenerativeModel({ model: modelName });
}

function isModelUnavailableError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("not supported for generatecontent") ||
    message.includes("models/") && message.includes("not found") ||
    message.includes("404 not found")
  );
}

async function generateContentWithModelFallback(content) {
  if (!model) {
    throw new Error("Gemini API not initialized. Missing GEMINI_API_KEY.");
  }

  let lastError;

  for (let attempt = 0; attempt < modelCandidates.length; attempt++) {
    try {
      const result = await model.generateContent(content);
      const response = await result.response;
      initializationError = null;
      return response.text();
    } catch (error) {
      lastError = error;
      initializationError = error.message;

      if (isModelUnavailableError(error) && activeModelIndex < modelCandidates.length - 1) {
        const previousModel = modelName;
        setActiveModelByIndex(activeModelIndex + 1);
        console.warn(`⚠️  Model ${previousModel} unavailable. Switching to ${modelName}`);
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Unable to generate content from Gemini API.");
}

if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    setActiveModelByIndex(0);
    console.log(`✅ Gemini AI initialized successfully with model: ${modelName}`);
  } catch (error) {
    initializationError = error.message;
    console.error("❌ Failed to initialize Gemini AI:", error.message);
  }
} else {
  initializationError = "GEMINI_API_KEY not found in environment variables";
  console.warn("⚠️  GEMINI_API_KEY not found in environment variables. Using fallback responses only.");
}

export function getGeminiDiagnostics() {
  return {
    apiKeyConfigured: Boolean(apiKey),
    modelInitialized: Boolean(model),
    modelName,
    modelCandidates,
    initializationError,
  };
}

export async function generateQuestionFromAI(prompt) {
  try {
    const text = await generateContentWithModelFallback(prompt);
    console.log("✅ Question generated successfully via Gemini API");
    return text;
  } catch (error) {
    console.error("❌ Gemini API error in generateQuestionFromAI:", error.message);
    console.error("Full error:", error);
    throw error;
  }
}

export async function evaluateAnswerFromAI(prompt) {
  try {
    const text = await generateContentWithModelFallback(prompt);
    console.log("✅ Answer evaluated successfully via Gemini API");
    return text;
  } catch (error) {
    console.error("❌ Gemini API error in evaluateAnswerFromAI:", error.message);
    console.error("Full error:", error);
    throw error;
  }
}

export async function analyzeResumeFromAI({ resumeBase64, mimeType = "application/pdf", fileName = "resume.pdf" }) {

  // First, validate if the uploaded file is actually a resume
  const validationPrompt = `
  Look at this uploaded document and determine if it is a valid resume/CV.
  
  Respond with ONLY "VALID" if it's a resume/CV, or "INVALID" if it's not.
  
  A valid resume/CV typically contains:
  - Name or contact information
  - Work experience, education, or skills
  - Professional information
  
  Do NOT include any other text in your response.
  `;

  try {
    // Validate the document first
    const validationTextRaw = await generateContentWithModelFallback([
      { text: validationPrompt },
      {
        inlineData: {
          mimeType,
          data: resumeBase64,
        },
      },
    ]);

    const validationText = validationTextRaw.trim().toUpperCase();

    console.log("📄 Resume validation result:", validationText);

    if (validationText !== "VALID") {
      console.warn("❌ Uploaded file is not a valid resume");
      throw new Error("The uploaded file does not appear to be a valid resume. Please upload a resume/CV with your personal information, work experience, education, or skills.");
    }

    // If valid, proceed with analysis
    const analysisPrompt = `
  Analyze this resume and return concise interview preparation guidance in this exact format:
  Score: <number out of 10>
  Suggested Role: <one role>
  Suggested Difficulty: <Easy/Medium/Hard>
  Strengths:
  - <point 1>
  - <point 2>
  Improvements:
  - <point 1>
  - <point 2>
  Focus Topics:
  - <topic 1>
  - <topic 2>
  Summary:
  <2 short lines>

  Keep it practical for interview practice and use the resume content only.
  File name: ${fileName}
  `;

    const text = await generateContentWithModelFallback([
      { text: analysisPrompt },
      {
        inlineData: {
          mimeType,
          data: resumeBase64,
        },
      },
    ]);
    console.log("✅ Resume analyzed successfully via Gemini API");
    return text;
  } catch (error) {
    console.error("❌ Gemini API error in analyzeResumeFromAI:", error.message);
    console.error("Full error:", error);
    throw error;
  }
}

export async function generateHintFromAI(prompt) {
  try {
    const text = await generateContentWithModelFallback(prompt);
    console.log("✅ Hint generated successfully via Gemini API");
    return text;
  } catch (error) {
    console.error("❌ Gemini API error in generateHintFromAI:", error.message);
    console.error("Full error:", error);
    throw error;
  }
}