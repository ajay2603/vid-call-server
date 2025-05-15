import { Router } from "express";
import {
  createUser,
  loginUser,
  verifyToken,
} from "../controllers/auth/auth.js";

const router = Router();

router.post("/signin", loginUser);
router.post("/signup", createUser);
router.post("/verify-token", verifyToken, (req, res) =>
  res.status(200).json({ message: "Token is valid" })
);

export default router;
