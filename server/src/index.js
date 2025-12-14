import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import {createServer} from "http"
import {Server} from "socket.io"
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectInviteRoutes from "./routes/projectInviteRoutes.js";
import projectSharedRoutes from "./routes/projectSharedRoutes.js";
import projectInviteActions from "./routes/projectInviteActions.js";


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

app.use("/api/users", userRouter);

// 🔥 SPECIFIC project routes FIRST
app.use("/api/projects", projectSharedRoutes);     // /shared-with-me
app.use("/api/projects", projectInviteActions);    // /:projectId/invite/accept etc
app.use("/api/projects", projectInviteRoutes);     // /:projectId/invite

// 🔥 GENERIC project routes LAST
app.use("/api/projects", projectRouter);   

// Default route
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running!" });
});


io.on("connection", (socket) => {
  console.log(`new client connected ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-change", code);
  });

  // 🔥 CHAT EVENT
  socket.on("chat-message", ({ roomId, user, text, time }) => {
    socket.to(roomId).emit("chat-message", {
      user,
      text,
      time,
    });
  });

  socket.on("disconnect", () => {
    console.log(`client-disconnected ${socket.id}`);
  });
});



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
