const express = require("express");
const router = express.Router();
const WorkoutPlan = require("../Schema/WorkoutPlan"); // Import your MongoDB model
const User = require("../Schema/User");

router.post("/save-workoutplan", async (req, res) => {
  try {
    const email = req.body.email;
    console.log("Email from save-workoutplan route", email);

    // Find user in db
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found.");

    const userId = user.id;
    const plan = req.body.generatedPlan;

    // update if exists, insert if not
    const updatedWorkoutPlan = await WorkoutPlan.findOneAndUpdate(
      { userId },
      { userId, plan },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Workout plan saved successfully!" });
  } catch (error) {
    console.error("Error saving workout plan:", error);
    res.status(500).json({ error: "Failed to save workout plan." });
  }
});

router.post("/display-workoutplan", async (req, res) => {
  try {
    // Get user's email
    const email = req.body.email;
    console.log("display-workoutplan from backend: ", email);

    // Find user in db
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Use the user's ID to find their workout plan
    const workoutPlanData = await WorkoutPlan.findOne({ userId: user.id });
    if (!workoutPlanData) return res.status(404).json({ message: "Workout plan not found." });
    console.log("The workoutPlan from the backend: ", workoutPlanData);

    // Send workout plan data to the frontend
    res.status(200).send(workoutPlanData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching the workout plan." });
  }
});

module.exports = router;
