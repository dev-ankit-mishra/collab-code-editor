import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    projectName: { 
      type: String, 
      required: true 
    },
    userId: { 
      type: String, 
      required: true // Supabase user ID 
    },
    code: { 
      type: String, 
      default: "" 
    },
    template: {
      label: { type: String, default: "custom" },
      version: { type: String, default: "1.0.0" },
      boilerplate: { type: String, default: "" }
    }
  },
  { timestamps: true,Collection:"Project"}
);

export const Project = model("Project", projectSchema);
