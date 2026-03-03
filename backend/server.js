import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import interviewRoutes from "./routes/interviewRoutes.js";
import { getGeminiDiagnostics } from "./services/geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// CORS configuration - allow all origins for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: "20mb" }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check and diagnostics endpoint
app.get('/health', (req, res) => {
  const gemini = getGeminiDiagnostics();
  res.json({
    message: "Backend is running!",
    geminiApiKey: gemini.apiKeyConfigured ? "✅ Found" : "❌ Not found",
    modelInitialized: gemini.modelInitialized,
    modelName: gemini.modelName,
    initializationError: gemini.initializationError
  });
});

// Serve static frontend files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API routes
app.use("/", interviewRoutes);

// Fallback to index.html for SPA routing (catch-all for unmatched routes)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});