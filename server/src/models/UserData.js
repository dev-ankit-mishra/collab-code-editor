import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSpecificSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // Supabase user ID — must be unique
      index: true   // indexing for faster lookups
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    projectObject: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project"
      }
    ]
  },
  { timestamps: true,collection:"UserData"}
);

export const UserData = model("UserData", UserSpecificSchema);
