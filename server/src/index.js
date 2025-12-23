import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { connectDB } from "./db.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import projectInviteRoutes from "./routes/projectInviteRoutes.js";
import projectSharedRoutes from "./routes/projectSharedRoutes.js";
import projectInviteActions from "./routes/projectInviteActions.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ================= SOCKET.IO SETUP ================= */
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* ================= SOCKET AUTH MIDDLEWARE ================= */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Unauthorized socket connection"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});

/* ================= SOCKET EVENTS ================= */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, socket.user.name);

  /* JOIN PROJECT ROOM */
  socket.on("join-room", ({ roomId }) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`📦 ${socket.user.name} joined room ${roomId}`);
  });

  /* REAL-TIME CODE SYNC */
  socket.on("code-change", ({ roomId, code }) => {
    if (!socket.rooms.has(roomId)) return;
    socket.to(roomId).emit("code-change", code);
  });

  /* 💬 CHAT MESSAGE */
  socket.on("chat-message", ({ roomId, text }) => {
    if (!socket.rooms.has(roomId)) return;

    io.to(roomId).emit("chat-message", {
      userId: socket.user.id,
      user: socket.user.name,
      text,
      time: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

/* ================= EXPRESS MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/users", userRouter);

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
