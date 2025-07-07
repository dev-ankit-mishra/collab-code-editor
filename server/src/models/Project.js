import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  username: { type: String },
  code: { type: String },
  template: { label: {type: string}, version: {type: string}, boilerplate: {type: string} },
  time: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
