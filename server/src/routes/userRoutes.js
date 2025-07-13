import express from "express";
import { UserData } from "../models/UserData.js";

const userRouter = express.Router();

userRouter.post("/create-user", async (req, res) => {
  const { userName, userId, userEmail } = req.body;

  if (!userName || !userId || !userEmail) {
    return res.status(400).json({ message: "userName, userId, and userEmail are required" });
  }

  try {
    const existingUser = await UserData.findOne({ userId });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", data: existingUser });
    }

    const newUser = new UserData({ userName, userId, userEmail });
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Successfully created new user",
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error?.message || "Unknown server error",
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
