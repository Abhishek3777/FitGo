import Workout from "../models/Workout.js";

// Epley 1RM formula
function calc1RM(weight, reps) {
  return weight * (1 + reps / 30);
}

export const addWorkout = async (req, res) => {
  try {
    const { exercise, sets, notes } = req.body;

    if (!exercise || !sets || sets.length === 0) {
      return res.status(400).json({ msg: "Invalid workout data" });
    }

    // Calculate workout stats
    let volume = 0;
    let maxWeight = 0;
    let best1RM = 0;

    sets.forEach((s) => {
      volume += s.reps * s.weight;
      if (s.weight > maxWeight) maxWeight = s.weight;

      const est1RM = calc1RM(s.weight, s.reps);
      if (est1RM > best1RM) best1RM = est1RM;
    });

    // Check previous PRs
    const previousPR = await Workout.find({
      userId: req.user.id,
      exercise,
    })
      .sort({ estimated1RM: -1 })
      .limit(1);

    let newPR = false;
    if (!previousPR[0] || best1RM > previousPR[0].estimated1RM) {
      newPR = true;
    }

    const workout = await Workout.create({
      userId: req.user.id,
      exercise,
      sets,
      notes,
      volume,
      maxWeight,
      estimated1RM: best1RM,
      isPR: newPR,
    });

    res.json({
      msg: newPR ? "🔥 New PR Achieved!" : "Workout Logged",
      workout,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({
      date: -1,
    });

    res.json(workouts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getExerciseHistory = async (req, res) => {
  try {
    const { name } = req.params;

    const logs = await Workout.find({
      userId: req.user.id,
      exercise: name,
    }).sort({ date: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
