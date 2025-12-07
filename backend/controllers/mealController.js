import axios from "axios";
import Meal from "../models/mealModel.js";
import dotenv from "dotenv";
dotenv.config();

export const getCalories = async (req, res) => {
  try {
    const q = req.query.q; // e.g., "1 banana"

    if (!q) {
      return res.status(400).json({ msg: "Query is required" });
    }

    const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(q)}`;

    const response = await axios.get(url, {
      headers: {
        "X-Api-Key": process.env.NINJA_KEY,
      },
    });

    const data = response.data.items;

    if (!data || data.length === 0) {
      return res.status(404).json({ msg: "Food not found" });
    }

    res.json({
      calories: data[0].calories,
      protein: data[0].protein_g,
      carbs: data[0].carbohydrates_total_g,
      fat: data[0].fat_total_g,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
export const addMeal = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.USER:", req.user);
  try {
    const { name, quantity, calories, protein, carbs, fat } = req.body;

    const meal = await Meal.create({
      user: req.user.id,
      name,
      quantity,
      calories,
      protein,
      carbs,
      fat,
    });

    res.json(meal);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getTodayMeals = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const meals = await Meal.find({
      user: req.user.id,
      date: { $gte: start }
    });

    res.json(meals);
  } catch (err) {
    console.error("TODAY MEALS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
