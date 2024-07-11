import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./user.model";
export interface IPost {
  description: string;
  user: IUser;
  imageUrl?: string;
  likes?: string[];
  comments: any;
}
export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
}
const postSchame = new mongoose.Schema(
  {
    description: { type: String, required: true },
    user: {
      userId: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    likes: {
      type: [String],
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);
export const Post: Model<IPostDocument> =
  mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postSchame);
