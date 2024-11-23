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

    // Upsert (update if exists, insert if not) the workout plan for the user
    const updatedWorkoutPlan = await WorkoutPlan.findOneAndUpdate(
      { userId }, // Find a workout plan document by the userId
      { userId, plan }, // Update or set these fields
      { new: true, upsert: true } // Options: return the updated document and create if not exists
    );

    res.status(200).json({ message: "Workout plan saved successfully!" });
  } catch (error) {
    console.error("Error saving workout plan:", error);
    res.status(500).json({ error: "Failed to save workout plan." });
  }
});

// router.post("/save-workoutplan", async (req, res) => {
//   try {
//     const email = req.body.email;
//     console.log("Email from save-workoutplan route", email);

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send("User not found.");

//     const userId = user.id;
//     // console.log("user ID from save-workoutplan", userId);

//     const plan = req.body.generatedPlan;
//     // console.log("Workoutplan from save-workoutplan", plan);

//     // Create document
//     const newWorkoutPlan = new WorkoutPlan({
//       userId,
//       plan, 
//     });

//     // Save document to database
//     await newWorkoutPlan.save();

//     res.status(201).json({ message: "Workout plan saved successfully!" });
//   } catch (error) {
//     console.error("Error saving workout plan:", error);
//     res.status(500).json({ error: "Failed to save workout plan." });
//   }
// });

module.exports = router;
