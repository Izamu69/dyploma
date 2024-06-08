import { model, Schema, Document, Types } from "mongoose";

export interface IQuestion extends Document {
  id: Types.ObjectId;
  question: string;
  subquestions?: { pictures: boolean; content: string }[];
  answers: { pictures: boolean; content: string }[];
  questionAnswerDependence: number[];
  suiTable: boolean;
}

const questionSchema: Schema = new Schema({
  question: { type: String, required: true },
  subquestions: [
    {
      pictures: { type: Boolean, default: false },
      content: { type: String, required: true }
    }
  ],
  answers: [
    {
      pictures: { type: Boolean, default: false },
      content: { type: String, required: true }
    }
  ],
  questionAnswerDependence: [{ type: Number }],
  suiTable: { type: Boolean, default: false }
});

export default model<IQuestion>("Question", questionSchema);
