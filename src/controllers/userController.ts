import { Request, Response } from "express";
import { IUser } from "../types/userType";
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
  const { name, age, phone, email } = req.body as IUser;
  try {
    const newUser: IUser = new User({ name, age, phone, email });
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
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export { getUsers, createUser, updateUser, deleteUser, patchUser };
