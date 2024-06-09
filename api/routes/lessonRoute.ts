import express from "express";
import { getLessons, createLesson, updateLesson, deleteLesson, getLessonById } from "../controllers/lessonController";

const router = express.Router();

router.get("/lessons", getLessons);
router.post("/lessons", createLesson);
router.put("/lessons/:id", updateLesson);
router.delete("/lessons/:id", deleteLesson);
router.get("/lessons/:id", getLessonById);

export default router;
