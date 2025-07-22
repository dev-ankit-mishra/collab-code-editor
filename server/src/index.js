import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import {createServer} from "http"
import {Server} from "socket.io"
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();

const httpServer=createServer(app)
const io=new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
  }
})

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


io.on("connection",(socket)=>{
  console.log(`new client connected ${socket.id}`)

  socket.on("join-room",(roomId)=>{
    socket.join(roomId)
    console.log(`${socket.id} joined ${roomId}`)
  })

  socket.on("code-change",({roomId,code})=>{
    socket.to(roomId).emit("code-change",code)
  })

  socket.on("disconnect",()=>{
    console.log(`client-disconnected ${socket.id}`)
  })


})



// Start server only after DB connects
connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
