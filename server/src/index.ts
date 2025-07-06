import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",                  
  "https://codevspace.netlify.app"      
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use("/api/projects",projectRoutes);


app.get("/",(req,res)=>{
  res.json("hello")
})




const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
