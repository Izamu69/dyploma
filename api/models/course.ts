import { model, Schema, Document, Types } from "mongoose";

export interface ICourse extends Document {
  id: Types.ObjectId;
  courseName: string;
  lessonIds?: Types.ObjectId[];
  testIds?: Types.ObjectId[];
  files?: string[];
  authorId: Types.ObjectId;
}

const courseSchema: Schema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    lessonIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    testIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    files: [{type: String}],
    authorId: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICourse>("Course", courseSchema);
