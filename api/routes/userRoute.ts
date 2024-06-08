import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
  loginUser,
} from "../controllers/userController";

const userRoutes: Router = Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.patch("/users/:id", patchUser);
userRoutes.post("/users/login", loginUser);

export default userRoutes;
