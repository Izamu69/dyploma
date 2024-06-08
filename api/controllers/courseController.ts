import { Request, Response } from "express";
import Course, { ICourse } from "../models/course";

const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses: ICourse[] = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching courses", error: error });
  }
};

const createCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseName, lessonIds, testIds, files, authorId } = req.body as ICourse;
  try {
    const newCourse: ICourse = new Course({
      courseName,
      lessonIds,
      testIds,
      files,
      authorId,
    });
    await newCourse.save();
    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating course", error: error });
  }
};

const updateCourse = async (req: Request, res: Response): Promise<void> => {
  const courseId = req.params.id;
  const updatedFields = req.body as Partial<ICourse>;
  try {
    const course: ICourse | null = await Course.findByIdAndUpdate(
      courseId,
      updatedFields,
      { new: true }
    );
    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating course", error: error });
  }
};

const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  const courseId = req.params.id;
  try {
    const deletedCourse: ICourse | null = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }
    res.status(204).json({ success: true, message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting course", error: error });
  }
};

const patchCourse = async (req: Request, res: Response): Promise<void> => {
  const courseId = req.params.id;
  const updatedFields: Partial<ICourse> = req.body;

  try {
    const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedCourse) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating course", error: error });
  }
};

export { getCourses, createCourse, updateCourse, deleteCourse, patchCourse };
