import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", projectRoutes);

const allowedOrigins = ["http://localhost:5173", "https://coDevSpace.netlify.app"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
