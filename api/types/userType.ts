import { Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
}
