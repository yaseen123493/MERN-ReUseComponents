import express from "express";
import { user } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, user);

export { router as userRouter };
