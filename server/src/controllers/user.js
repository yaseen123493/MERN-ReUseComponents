import mongoose from "mongoose";
import UserModel from "../models/Users.js";

export const user = async (req, res) => {
  try {
    const { email } = req.body;
    const userDetails = await UserModel.findOne({
      email: email,
    });
    if (!userDetails)
      return res.status(400).json({ msg: "User not found", user: null });

    res.status(200).json({ user: userDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
