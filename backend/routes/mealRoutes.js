import express from "express";
import { protect } from "../middleware/authMiddleware.js"
import { addMeal, getCalories, getTodayMeals } from "../controllers/mealController.js";

const router = express.Router();

router.get("/meals", (req, res, next) => {
    next();
}, protect, getCalories);

router.post("/meals", protect, addMeal);
router.get("/meals/today", protect, getTodayMeals);

export default router;