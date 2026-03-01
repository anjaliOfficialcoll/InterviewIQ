import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/", interviewRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});