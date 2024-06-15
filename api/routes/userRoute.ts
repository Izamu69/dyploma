import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
  loginUser,
  checkPassword,
  addTestResult,
  getUserInfo,
  markLessonComplete,
} from "../controllers/userController";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.patch("/users/:id", patchUser);
userRoutes.post("/users/login", loginUser);
userRoutes.post("/users/:id/checkPassword", checkPassword);
userRoutes.post("/users/:id/tests", addTestResult);
userRoutes.get("/users/:id/info", getUserInfo);
userRoutes.post("/users/:id/markLessonComplete", markLessonComplete);

export default userRoutes;
