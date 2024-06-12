import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
import User from "../models/user";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, firstName, lastName, password, email } = req.body as IUser;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      userName,
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const updatedFields = req.body as Partial<IUser>;
  try {
    if (updatedFields.password) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }
    const user: IUser | null = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      {
        new: true,
      }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const patchUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const updatedFields: Partial<IUser> = req.body;

  try {
    if (updatedFields.password) {
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user: IUser | null = await User.findById(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const checkPassword = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.status(200).json({ message: "Password is valid" });
  } catch (error) {
    res.status(500).json({ message: "Error checking password" });
  }
};

const addTestResult = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { testId, grade } = req.body;

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.testsTaken = user.testsTaken || [];
    const existingTestIndex = user.testsTaken.findIndex(test => test.testId.toString() === testId);

    if (existingTestIndex !== -1) {
      user.testsTaken[existingTestIndex].grade = grade;
    } else {
      user.testsTaken.push({ testId, grade });
    }

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error updating test results" });
  }
};

const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const user: IUser | null = await User.findById(userId).populate('testsTaken.testId');
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user information" });
  }
};

export { getUsers, createUser, updateUser, deleteUser, patchUser, loginUser, checkPassword, addTestResult, getUserInfo };
