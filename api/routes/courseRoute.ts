import { Router } from "express";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  patchCourse,
} from "../controllers/courseController";

const courseRoutes: Router = Router();

courseRoutes.get("/courses", getCourses);
courseRoutes.post("/courses", createCourse);
courseRoutes.put("/courses/:id", updateCourse);
courseRoutes.delete("/courses/:id", deleteCourse);
courseRoutes.patch("/courses/:id", patchCourse);

export default courseRoutes;
