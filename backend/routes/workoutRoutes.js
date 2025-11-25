import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addWorkout, getWorkouts, getExerciseHistory } from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", protect, addWorkout);
router.get("/", protect, getWorkouts);
router.get("/:name", protect, getExerciseHistory);

export default router;
