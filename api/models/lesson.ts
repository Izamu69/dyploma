import { model, Schema, Document, Types } from "mongoose";

export interface ILesson extends Document {
  id: Types.ObjectId;
  lessonName: string;
  sections?: { type: string; content: string }[][];
  testIds?: Types.ObjectId[];
  files?: string[];
  authorId: Types.ObjectId;
}

const lessonSchema: Schema = new Schema(
  {
    lessonName: {
      type: String,
      required: true,
    },
    sections: [
      [ 
        {
          type: { type: String, required: true },
          content: { type: String, required: true }
        },
      ]
    ],
    testIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: false,
      },
    ],
    files: [{type: String, required: false,}],
    authorId: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILesson>("Lesson", lessonSchema);
