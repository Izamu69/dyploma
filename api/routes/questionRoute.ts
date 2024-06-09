import { Router } from "express";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  patchQuestion,
  getQuestionById,
} from "../controllers/questionController";

const questionRoutes: Router = Router();

questionRoutes.get("/questions", getQuestions);
questionRoutes.post("/questions", createQuestion);
questionRoutes.put("/questions/:id", updateQuestion);
questionRoutes.delete("/questions/:id", deleteQuestion);
questionRoutes.patch("/questions/:id", patchQuestion);
questionRoutes.get("/questions/:id", getQuestionById);

export default questionRoutes;
