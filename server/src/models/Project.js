import { timeStamp } from "console";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  username: { type: String },
  code: { type: String },
  template: { label: {type: String}, version: {type: String}, boilerplate: {type: String} },
  time: { type: Date, default: Date.now },
},{timestamps:true});

export const Project = mongoose.model("Project", projectSchema);
