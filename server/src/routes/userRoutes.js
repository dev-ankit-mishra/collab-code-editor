import express from "express";
import { UserData } from "../models/UserData";

const userRouter = express.Router();

userRouter.post("/create-user", async (req, res) => {
  const { userName, userId } = req.body;

  if (!userName || !userId) {
    return res.status(400).json({ message: "userName and userId are required" });
  }

  try {
    const existingUser = await UserData.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new UserData({ userName, userId });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Successfully created new user",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

  userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await UserData.findOne({ userId: id });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});


export default userRouter;
