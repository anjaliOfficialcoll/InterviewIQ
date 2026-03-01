import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

async function listModels() {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

listModels();