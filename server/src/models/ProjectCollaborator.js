import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProjectCollaboratorSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    userId: {
      type: String, // Supabase user id (UUID)
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["OWNER", "EDITOR", "VIEWER"],
      default: "EDITOR",
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED"],
      default: "PENDING",
    },

    invitedBy: {
      type: String, // Supabase user id of owner
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Prevent duplicate collaborator records
 * One user per project
 */
ProjectCollaboratorSchema.index(
  { projectId: 1, userId: 1 },
  { unique: true }
);

export const ProjectCollaborator = model(
  "ProjectCollaborator",
  ProjectCollaboratorSchema
);
