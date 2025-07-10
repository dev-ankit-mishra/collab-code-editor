import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // or "*" for all origins (not recommended for production)
  credentials: true,               // if using cookies or auth headers
}));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running!" });
});

// Start server only after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
