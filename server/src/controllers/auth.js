/* LOGGING IN */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (email == "" || password == "")
      return res
        .status(400)
        .json({ msg: "please Enter your email & password" });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: UserModel._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    delete user.password;
    delete user.confirmPassword;
    res.status(200).json({
      token,
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone } =
      req.body;
    const user = await UserModel.findOne({ email: email });
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      phone == ""
    )
      return res.status(400).json({ msg: "All fields are Mandatory" });
    if (user) return res.status(400).json({ msg: "User already exist's" });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      confirmPassword: passwordHash,
      phone,
    });
    if (password != confirmPassword)
      return res.status(400).json({ msg: "password not match" });

    const savedUser = await newUser.save();
    res.status(200).json({ msg: "Successfully Registered!", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    // Save the password reset token in your database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the password reset email to the user
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "personal.shaiks@gmail.com",
        pass: "ebbsizfhcztomkbz",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "personal.shaiks@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n
        Please click on the following link or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log("error: ", err);
        return res
          .status(500)
          .json({ message: "Failed to send password reset email" });
      }

      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Extract the token and new password from the request body
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // Find the user with the reset token and check if the token has expired
    const user = await UserModel.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    if (confirmPassword !== password)
      return res
        .status(400)
        .json({ message: "Password and Confirm Password need to be the same" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
    user.confirmPassword = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
