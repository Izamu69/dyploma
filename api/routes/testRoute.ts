import { Router } from "express";
import {
  getTests,
  createTest,
  updateTest,
  deleteTest,
  patchTest,
  getTestById,
} from "../controllers/testController";

const testRoutes: Router = Router();

testRoutes.get("/tests", getTests);
testRoutes.post("/tests", createTest);
testRoutes.put("/tests/:id", updateTest);
testRoutes.delete("/tests/:id", deleteTest);
testRoutes.patch("/tests/:id", patchTest);
testRoutes.get("/tests/:id", getTestById);

export default testRoutes;
