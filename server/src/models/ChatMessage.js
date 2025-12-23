import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: String, // Supabase user id
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // createdAt is important
);

export const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);
