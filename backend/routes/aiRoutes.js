import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const MODEL = "mistralai/mistral-7b-instruct:free"

router.post("/summary", async (req, res) => {
    try {
        // Dummy fixed response
        const dummy = `
Your fitness summary is ready!

• Calories look balanced today  
• Protein intake is decent  
• Keep pushing on your workouts  
• You're progressing well—stay consistent 💪
`;

        res.json({ summary: dummy });
    } catch (err) {
        res.status(500).json({ error: "AI failed" });
    }
});

export default router;
