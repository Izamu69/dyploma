import { Request, Response } from "express";
import { ITest } from "../models/test";
import Test from "../models/test";

const getTests = async (req: Request, res: Response): Promise<void> => {
  try {
    const tests: ITest[] = await Test.find();
    res.status(200).json({ tests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests" });
  }
};

const createTest = async (req: Request, res: Response): Promise<void> => {
  const { testName, questionIds } = req.body as ITest;
  try {
    const newTest: ITest = new Test({
      testName,
      questionIds,
    });
    await newTest.save();
    res.status(201).json({ test: newTest });
  } catch (error) {
    res.status(500).json({ message: "Error creating test" });
  }
};

const updateTest = async (req: Request, res: Response): Promise<void> => {
  const testId = req.params.id;
  const updatedFields = req.body as Partial<ITest>;
  try {
    const test: ITest | null = await Test.findByIdAndUpdate(
      testId,
      updatedFields,
      {
        new: true,
      }
    );
    if (!test) {
      res.status(404).json({ message: "Test not found" });
      return;
    }
    res.status(200).json({ test });
  } catch (error) {
    res.status(500).json({ message: "Error updating test" });
  }
};

const deleteTest = async (req: Request, res: Response): Promise<void> => {
  const testId = req.params.id;
  try {
    const deletedTest: ITest | null = await Test.findByIdAndDelete(testId);
    if (!deletedTest) {
      res.status(404).json({ message: "Test not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting test" });
  }
};

const patchTest = async (req: Request, res: Response): Promise<void> => {
  const testId = req.params.id;
  const updatedFields: Partial<ITest> = req.body;

  try {
    const updatedTest: ITest | null = await Test.findByIdAndUpdate(
      testId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedTest) {
      res.status(404).json({ message: "Test not found" });
      return;
    }

    res.status(200).json({ test: updatedTest });
  } catch (error) {
    res.status(500).json({ message: "Error updating test" });
  }
};

export { getTests, createTest, updateTest, deleteTest, patchTest };
