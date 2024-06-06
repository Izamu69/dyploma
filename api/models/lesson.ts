import { model, Schema, Document, Types } from "mongoose";

export interface ILesson extends Document {
  id: number;
  lessonName: string;
}

const lessonSchema: Schema = new Schema(
  {
    lessonName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILesson>("Lesson", lessonSchema);
