import { model, Schema, Document, Types } from "mongoose";

export interface ITest extends Document {
  id: Types.ObjectId;
  associatedLessonIds: Types.ObjectId[];
  testName: string;
  questionIds: Types.ObjectId[];
  authorId: Types.ObjectId;
}

const testSchema: Schema = new Schema(
  {
    associatedLessonIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    testName: {
      type: String,
      required: true,
    },
    questionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    authorId: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITest>("Test", testSchema);
