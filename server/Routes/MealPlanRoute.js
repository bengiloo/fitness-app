const express = require('express');
const axios = require('axios');
const Meal = require('../Schema/MealPlan'); // used to create and store the meal for the user
const User = require("../Schema/User");
const router = express.Router();
require('dotenv').config(); // used later for now it is hardcoded


router.post("/fetch-meal", async (req, res) => {
  // For debugging
  // console.log('POST request received at /fetch-meal');
  try {
    // parameters
    const { diet, health, cuisineType, mealType, calories } = req.body.queryParams;

    // API endpoint
    const edamamUrl = "https://api.edamam.com/api/recipes/v2";
    console.log("Hello from meal routes");
    // Construct query parameters
    const params = {
      type: "public",
      app_id: process.env.APP_ID, // API ID
      app_key: process.env.API_KEY, // API Key
      diet,
      health,
      cuisineType,
      mealType,
      calories
    };

    // debug line
    console.log(params);

    // construct headers
    const headers = {
      Accept: "application/json",
      "Edamam-Account-User": process.env.USER_ID,
      "Accept-Language": "en",
    };

    // Call edamam api
    const response = await axios.get(edamamUrl, { headers, params });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.post("/save-mealplan", async (req, res) => {
  try {
    // get user's email
    const email = req.body.email;
    console.log(email);

    // Find user in db
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found.");


    // Get teh id to reference mealplan
    const userId = user.id;
    const mealPlanData = req.body.mealPlanData;

    // Update collection
    //TODO: Test if it can insert if no meal plan exists
    const updatedMealPlan = await Meal.findOneAndUpdate(
      { userId }, 
      { userId, mealPlanData }, 
      { new: true, upsert: true }
    );

    res.status(200).send("Meal plan saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while saving the meal plan.");
  }
});

module.exports = router;