import { Router } from "express";
import multer from "multer";
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
  uploadFile,
} from "../controllers/userController";
import path from "path";

const userRoutes: Router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

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
userRoutes.post("/users/:id/upload", upload.single("file"), uploadFile);

export default userRoutes;
