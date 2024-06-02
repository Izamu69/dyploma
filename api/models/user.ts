import { model, ObjectId, Schema } from "mongoose";

import { Document } from "mongoose";

export interface IUser extends Document {
  id: ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  phone: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
