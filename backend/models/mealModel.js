import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },   // e.g. "banana"
    quantity: { type: String, required: true }, // "1 banana"
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,

    date: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
