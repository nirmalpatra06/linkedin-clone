import mongoose, { Model,Document } from "mongoose";
import { IUser } from "./user.model";
export interface IComment {
  textMsg: string;
  user: IUser;
}
export interface ICommentDocument extends IComment, Document {
  createAt: Date;
  updatedAt: Date;
}
const commentSchema = new mongoose.Schema<ICommentDocument>(
  {
    textMsg: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true }
);
export const Comment:Model<ICommentDocument>=mongoose.models?.Comment || mongoose.model<ICommentDocument>("Comment",commentSchema)
