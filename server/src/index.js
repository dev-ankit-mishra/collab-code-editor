import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketAuth } from "./middleware/socketAuth.js";

import { connectDB } from "./db.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectInviteRoutes from "./routes/projectInviteRoutes.js";
import projectSharedRoutes from "./routes/projectSharedRoutes.js";
import projectInviteActions from "./routes/projectInviteActions.js";
import { ChatMessage } from "./models/ChatMessage.js";
import chatRoutes from "./routes/chatRoutes.js";
import deleteAccountRouter from "./routes/deleteAccount.js"
import contactRoutes from "./routes/contact.routes.js";




dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ================= SOCKET.IO SETUP ================= */
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://codevspace.netlify.app", // 🔥 your frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
  transports: ["websocket"], // 🔥 IMPORTANT for Render
});

/* ================= SOCKET AUTH ================= */
io.use(socketAuth);

/* ================= SOCKET EVENTS ================= */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, socket.user.email);

  socket.on("join-room", ({ roomId }) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`📦 ${socket.user.email} joined room ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    if (!socket.rooms.has(roomId)) return;
    socket.to(roomId).emit("code-change", code);
  });

  socket.on("chat-message", async ({ roomId, text }) => {
    if (!socket.rooms.has(roomId)) return;
    if (!text?.trim()) return;

    try {
      const message = await ChatMessage.create({
        projectId: roomId,
        userId: socket.user.id,
        userName: socket.user.name,
        text,
      });

      /* 🔴 OLD CODE (caused duplicates & missing ID)
      io.to(roomId).emit("chat-message", {
        user: message.userName,
        text: message.text,
        time: message.createdAt,
      });
      */

      // ✅ NEW CODE (Fixes duplicates & adds ID)
      // 1. Use socket.to() instead of io.to() to exclude the sender
      // 2. Add userId to the payload so frontend knows who sent it
      socket.to(roomId).emit("chat-message", {
        user: message.userName,
        text: message.text,
        time: message.createdAt,
        userId: message.userId, // 🔥 CRITICAL: Frontend needs this to style bubbles!
      });

    } catch (err) {
      console.error("❌ Failed to save chat message:", err);
    }
  });




  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

/* ================= EXPRESS MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codevspace.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/contact", contactRoutes);

/* ================= ROUTES ================= */
app.use("/api", chatRoutes);
app.use("/api/users", userRouter);
app.use("/api/users", deleteAccountRouter);



// 🔥 ORDER MATTERS
app.use("/api/projects", projectSharedRoutes);
app.use("/api/projects", projectInviteActions);
app.use("/api/projects", projectInviteRoutes);
app.use("/api/projects", projectRouter);

/* ================= DEFAULT ROUTE ================= */
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running!" });
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
