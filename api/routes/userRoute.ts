import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
  loginUser,
  checkPassword,
} from "../controllers/userController";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.patch("/users/:id", patchUser);
userRoutes.post("/users/login", loginUser);
userRoutes.post("/users/:id/checkPassword", checkPassword);

export default userRoutes;