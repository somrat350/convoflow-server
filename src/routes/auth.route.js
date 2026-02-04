import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes for user authentication
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/updateProfile", isAuthenticated, updateProfile);

router.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
