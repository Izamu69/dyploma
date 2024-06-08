import { model, ObjectId, Schema } from "mongoose";

import { Document } from "mongoose";

export interface IUser extends Document {
  id: ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  files?: string[];
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    files: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
