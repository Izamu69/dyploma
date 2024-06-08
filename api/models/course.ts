import { model, Schema, Document, Types } from "mongoose";

export interface ICource extends Document {
  id: number;
  courceName: string;
  lessonIds?: Types.ObjectId[];
  testIds?: Types.ObjectId[];
  files?: string[];
}

const courceSchema: Schema = new Schema(
  {
    courceName: {
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
    filess: [{type: String}]
  },
  { timestamps: true }
);

export default model<ICource>("Cource", courceSchema);
