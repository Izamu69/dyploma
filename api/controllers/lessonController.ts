import { Request, Response } from "express";
import { Types } from "mongoose";
import Lesson, { ILesson } from "../models/lesson"; // Adjust the import based on your setup

const getLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const lessons: ILesson[] = await Lesson.find();
    res.status(200).json({ success: true, lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lessons", error: error.message });
  }
};

const createLesson = async (req: Request, res: Response): Promise<void> => {
  const { lessonName, sections, testIds, files, authorId } = req.body as ILesson;
  try {
    const newLesson: ILesson = new Lesson({
      lessonName,
      sections,
      testIds,
      files,
      authorId,
    });
    await newLesson.save();
    res.status(201).json({ success: true, lesson: newLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating lesson", error: error.message });
  }
};

const updateLesson = async (req: Request, res: Response): Promise<void> => {
  const lessonId = req.params.id;
  const updatedFields = req.body as Partial<ILesson>;
  try {
    const lesson: ILesson | null = await Lesson.findByIdAndUpdate(
      lessonId,
      updatedFields,
      { new: true }
    );
    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(200).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating lesson", error: error.message });
  }
};

const deleteLesson = async (req: Request, res: Response): Promise<void> => {
  const lessonId = req.params.id;
  try {
    const deletedLesson: ILesson | null = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(204).json({ success: true, message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting lesson", error: error.message });
  }
};

const getLessonById = async (req: Request, res: Response): Promise<void> => {
  const lessonId = req.params.id;
  try {
    const lesson: ILesson | null = await Lesson.findById(lessonId);
    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
      return;
    }
    res.status(200).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lesson", error: error.message });
  }
};

export { getLessons, createLesson, updateLesson, deleteLesson, getLessonById };
