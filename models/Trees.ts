
import mongoose, { Schema, Document } from "mongoose";

export interface ITree extends Document {
  id: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  createdAt: string;
  memberCount: number;
  lastModified: string;
  template: string;
  members:[
    {
      id : string,
      name : string,
      gender : string,
      alive : boolean,
      birthDate : string,
      deathDate : string,
      img : string,
      pid :[string]
    }
  ]
}



const TreeSchema = new Schema({
  userId: { type: String, required: true, index: true ,ref : "User"},
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
  members: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      gender: { type: String, required: true },
      alive: { type: Boolean, default: true },
      birthDate: { type: String },
      deathDate: { type: String },
      img: { type: String, default: "" },
      pid: { type: [String], default: [] },
    },
  ],
},{timestamps:true});

export default mongoose.models.Tree ||
  mongoose.model<ITree>("Tree", TreeSchema);
