import mongoose, { Schema, Document } from "mongoose";

export interface ITree extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
  members: {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    alive: boolean;
    birthDate: string;
    deathDate?: string;
    img: string;
    mid?: string; // Mother ID
    fid?: string; // Father ID
    pids?: string[]; // Partner IDs
  }[];
}

const MemberSchema = new Schema({
  id: { type: String,  },
  firstName: { type: String,  },
  lastName: { type: String,  },
  gender: { type: String,  enum: ['male', 'female'] },
  alive: { type: Boolean, default: true },
  birthDate: { type: String },
  deathDate: { type: String },
  img: { type: String, default: "" },
  mid: { type: String },
  fid: { type: String },
  pids: { type: [String], default: [] },
});

const TreeSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, },
    createdAt: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    memberCount: { type: Number, default: 0 },
    lastModified: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    template: { type: String, default: "hugo" },
    members: [MemberSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Tree || mongoose.model<ITree>("Tree", TreeSchema);
