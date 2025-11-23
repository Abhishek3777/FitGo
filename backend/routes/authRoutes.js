import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Get profile
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Update profile
router.put("/profile", protect, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  }).select("-password");

  res.json(updated);
});

export default router;
