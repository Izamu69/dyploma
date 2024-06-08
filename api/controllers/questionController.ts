import { Request, Response } from "express";
import { IQuestion } from "../models/question";
import Question from "../models/question";

const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions: IQuestion[] = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
};

const createQuestion = async (req: Request, res: Response): Promise<void> => {
  const { question, subquestions, answers, questionAnswerDependence, suiTable } = req.body as IQuestion;
  try {
    const newQuestion: IQuestion = new Question({
      question,
      subquestions,
      answers,
      questionAnswerDependence,
      suiTable,
    });
    await newQuestion.save();
    res.status(201).json({ question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error creating question" });
  }
};

const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  const questionId = req.params.id;
  const updatedFields = req.body as Partial<IQuestion>;
  try {
    const question: IQuestion | null = await Question.findByIdAndUpdate(
      questionId,
      updatedFields,
      {
        new: true,
      }
    );
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: "Error updating question" });
  }
};

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const questionId = req.params.id;
  try {
    const deletedQuestion: IQuestion | null = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting question" });
  }
};

const patchQuestion = async (req: Request, res: Response): Promise<void> => {
  const questionId = req.params.id;
  const updatedFields: Partial<IQuestion> = req.body;

  try {
    const updatedQuestion: IQuestion | null = await Question.findByIdAndUpdate(
      questionId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedQuestion) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    res.status(200).json({ question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error updating question" });
  }
};

export { getQuestions, createQuestion, updateQuestion, deleteQuestion, patchQuestion };
