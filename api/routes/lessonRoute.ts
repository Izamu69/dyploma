import { Router } from "express";
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById
} from "../controllers/lessonController";

const lessonRoutes: Router = Router();

lessonRoutes.get("/lessons", getLessons);
lessonRoutes.get("/lessons/:id", getLessonById);
lessonRoutes.post("/lessons", createLesson);
lessonRoutes.put("/lessons/:id", updateLesson);
lessonRoutes.delete("/lessons/:id", deleteLesson);

export default lessonRoutes;
