import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import userRoutes from "./routes/userRoute";

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

const url: string = `mongodb://mongodb:27017/users`;
mongoose
  .connect(url)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
