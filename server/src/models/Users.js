import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
