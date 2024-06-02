import { model, Schema, Document, Types } from "mongoose";

export interface ITest extends Document {
  id: number;
  testName: string;
  questionIds: Types.ObjectId[];
}

const testSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default model<ITest>("Test", testSchema);
