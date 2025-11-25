import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  exercise: { type: String, required: true },

  sets: [setSchema],

  volume: { type: Number, default: 0 }, // sum of (reps × weight)

  maxWeight: { type: Number, default: 0 }, // highest weight among sets

  estimated1RM: { type: Number, default: 0 }, // Epley formula

  isPR: { type: Boolean, default: false }, // flag if new PR achieved

  date: { type: Date, default: Date.now },

  notes: { type: String },
});

export default mongoose.model("Workout", workoutSchema);
