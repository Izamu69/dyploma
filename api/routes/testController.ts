import { Router } from "express";
import {
  getTests,
  createTest,
  updateTest,
  deleteTest,
  patchTest,
} from "../controllers/testController";

const testRoutes: Router = Router();

testRoutes.get("/tests", getTests);
testRoutes.post("/tests", createTest);
testRoutes.put("/tests/:id", updateTest);
testRoutes.delete("/tests/:id", deleteTest);
testRoutes.patch("/tests/:id", patchTest);

export default testRoutes;
