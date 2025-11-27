import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://fitgo-1.onrender.com/"], 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("server running");
});

app.use("/auth", authRoutes);
app.use("/", mealRoutes);
app.use("/workouts", workoutRoutes);
app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
