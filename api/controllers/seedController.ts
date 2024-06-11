import { Request, Response } from "express";
import User from "../models/user";
import Course from "../models/course";
import Lesson from "../models/lesson";
import Test from "../models/test";
import Question from "../models/question";
import { createCourse } from "./courseController";
import { createLesson } from "./lessonController";
import { createQuestion } from "./questionController";
import { createTest } from "./testController";
import { createUser } from "./userController";

const seedDatabase = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminRequest = {
      body: {
        userName: "admin",
        firstName: "Admin",
        lastName: "User",
        password: "1111",
        email: "admin@example.com"
      }
    } as Request;

    const userRequest = {
      body: {
        userName: "user",
        firstName: "Regular",
        lastName: "User",
        password: "1111",
        email: "user@example.com"
      }
    } as Request;

    await createUser(adminRequest, res);
    await createUser(userRequest, res);

    const admin = await User.findOne({ email: "admin@example.com" });
    const user = await User.findOne({ email: "user@example.com" });

    if (!admin || !user) {
      throw new Error("Admin or user not found after creation");
    }

    const userId = user._id;

    const question1Request = {
      body: {
        question: "What is 2 + 2?",
        answers: [{ pictures: false, content: "4" },{ pictures: false, content: "3" },{ pictures: false, content: "5" }],
        questionAnswerDependence: [0],
        suiTable: false,
      }
    } as Request;

    const question2Request = {
      body: {
        question: "Match the capitals?",
        subquestions:[{ pictures: false, content: "France" },{ pictures: false, content: "Ukraine" }],
        answers: [{ pictures: false, content: "Kyiv" },{ pictures: false, content: "Paris" },{ pictures: false, content: "New York" }],
        questionAnswerDependence: [1,0],
        suiTable: true,
      }
    } as Request;

    const question3Request = {
      body: {
        question: "Match the capitals?",
        subquestions:[{ pictures: false, content: "France" },{ pictures: false, content: "Ukraine" }],
        answers: [{ pictures: false, content: "Kyiv" },{ pictures: false, content: "Paris" },{ pictures: false, content: "New York" }],
        questionAnswerDependence: [1,0],
        suiTable: true,
      }
    } as Request;

    const question4Request = {
      body: {
        question: "What is 3 + 2?",
        answers: [{ pictures: false, content: "4" },{ pictures: false, content: "3" },{ pictures: false, content: "5" }],
        questionAnswerDependence: [2],
        suiTable: false,
      }
    } as Request;

    await createQuestion(question1Request, res);
    await createQuestion(question2Request, res);
    await createQuestion(question3Request, res);
    await createQuestion(question4Request, res);

    const question1 = await Question.findOne({ question: "What is 2 + 2?" });
    const question2 = await Question.findOne({ question: "Match the capitals?" });
    const question3 = await Question.findOne({ question: "Match the capitals?" });
    const question4 = await Question.findOne({ question: "What is 3 + 2?" });

    if (!question1 || !question2 ||!question3 ||!question4) {
      throw new Error("Questions not found after creation");
    }

    const test1Request = {
      body: {
        testName: "Math Test",
        questionIds: [question1._id, question3._id, question4._id],
        authorId: userId
      }
    } as Request;

    const test2Request = {
      body: {
        testName: "Geography Test",
        questionIds: [question2._id],
        authorId: userId
      }
    } as Request;

    await createTest(test1Request, res);
    await createTest(test2Request, res);

    const test1 = await Test.findOne({ testName: "Math Test" });
    const test2 = await Test.findOne({ testName: "Geography Test" });

    if (!test1 || !test2) {
      throw new Error("Tests not found after creation");
    }

    const lesson1Request = {
      body: {
        lessonName: "Basic Math",
        sections: [{ type: "text", content: "Math basics" }],
        testIds: [test1._id],
        authorId: userId
      }
    } as Request;

    const lesson2Request = {
      body: {
        lessonName: "Basic Geography",
        sections: [{ type: "text", content: "Geography basics" }],
        testIds: [test2._id],
        authorId: userId
      }
    } as Request;

    await createLesson(lesson1Request, res);
    await createLesson(lesson2Request, res);

    const lesson1 = await Lesson.findOne({ lessonName: "Basic Math" });
    const lesson2 = await Lesson.findOne({ lessonName: "Basic Geography" });

    if (!lesson1 || !lesson2) {
      throw new Error("Lessons not found after creation");
    }

    const course1Request = {
      body: {
        courseName: "Math 101",
        lessonIds: [lesson1._id],
        testIds: [test1._id],
        files: [],
        authorId: userId
      }
    } as Request;

    const course2Request = {
      body: {
        courseName: "Geography 101",
        lessonIds: [lesson2._id],
        testIds: [test2._id],
        files: [],
        authorId: userId
      }
    } as Request;

    await createCourse(course1Request, res);
    await createCourse(course2Request, res);

    const course1 = await Course.findOne({ courseName: "Math 101" });
    const course2 = await Course.findOne({ courseName: "Geography 101" });

    if (!course1 || !course2) {
      throw new Error("Courses not found after creation");
    }

    res.status(201).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error seeding database", error });
  }
};

export default seedDatabase;
