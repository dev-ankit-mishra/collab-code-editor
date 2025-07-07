import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  username: { type: String },
  code: { type: String },
  template: {type: String, default: "JavaScript"},
  time: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
