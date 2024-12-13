
import mongoose, { Schema, Document } from "mongoose";

export interface ITree extends Document {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
}

const TreeSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  memberCount: { type: Number, default: 0 },
  lastModified: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  template: { type: String, default: "Modern" },
});

export default mongoose.models.Tree ||
  mongoose.model<ITree>("Tree", TreeSchema);
