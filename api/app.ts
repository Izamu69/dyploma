import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import userRoutes from "./routes/userRoute";
import questionRoutes from "./routes/questionRoute";
import testRoutes from "./routes/testRoute";
import User from "./models/user";
import Test from "./models/test";
import Question from "./models/question";
import Course from "./models/course";
import courseRoutes from "./routes/courseRoute";
import lessonRoutes from "./routes/lessonRoute";
import Lesson from "./models/lesson";
import seedDatabase from "./controllers/seedController";

const app = express();
app.use(helmet());

const PORT: string | number = 3000;
const allowCrossOrigin = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};

app.use(express.json());
app.use(allowCrossOrigin);
app.use(userRoutes);
app.use(questionRoutes);
app.use(testRoutes);
app.use(courseRoutes);
app.use(lessonRoutes);

const url: string = `mongodb://mongodb:27017/mydb`;

mongoose.connect(url)
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      await Promise.all([
        User.createCollection(),
        Question.createCollection(),
        Test.createCollection(),
        Course.createCollection(),
        Lesson.createCollection()
      ]);
      const admin = await User.findOne({ email: "admin@example.com" });
      console.log(admin)
      if(!admin) {
        const req = {} as Request;
        const res = {} as Response;

        res.status = (code: number) => {
          console.log(`Status: ${code}`);
          return res;
        };
        
        res.json = (data: any) => {
          console.log("Response data:", data);
          return res;
        };

        await seedDatabase(req, res);
      }
      console.log("All collections created");
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    } catch (error) {
      console.error("Error creating collections:", error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
