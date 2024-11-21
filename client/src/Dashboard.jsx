import React from 'react';
import axios from "axios";

const Dashboard = () => {
  const generateMeals = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        throw new Error("User email not found in localStorage");
      }

      // get user input for a form to generate the meals
      // pass it as a req so that it is contructed as a query
      const response = await axios.post("http://localhost:3000/api/meals/fetch-meal", {
        diet: "low-carb",
        health: "Mediterranean", 
        cuisineType: "Asian", 
        mealType: "Lunch",
        calories: "100-150" 
      }); // hard coded for now, these need to come from the user input
      console.log("Fetched Meal Data in front end:", response.data);


      // Here i want to only grab 7 meals, one for each day
      const mealPlanData = [];

      // Display data to the console for debugging purposes
      for (let i = 0; i < 7; i++) {
        const mealName = response.data.hits[i].recipe.label;
        const typeOfMeal = response.data.hits[i].recipe.cuisineType[0];
        const fats = response.data.hits[i].recipe.digest[0].total.toFixed(2);
        const carbs = response.data.hits[i].recipe.digest[1].total.toFixed(2);
        const protein = response.data.hits[i].recipe.digest[2].total.toFixed(2);
        const calories = response.data.hits[i].recipe.calories.toFixed(2);
        console.log(`Meal ${i + 1}`);
        console.log(`Meal Name: ${mealName}`);
        console.log(`Type of Meal: ${typeOfMeal}`);
        console.log(`Fats: ${fats}`);
        console.log(`Carbs: ${carbs}`);
        console.log(`Protein: ${protein}`);
        console.log(`Calories: ${calories}`);
        console.log("\n");

        // Push a meal onto the meal plan
        mealPlanData.push({
          mealName,
          typeOfMeal,
          nutrients: {
            fats,
            carbs,
            protein,
            calories
          }
        });

      }

      // save the meal plan to db
      const mealPlanPayload = { email, mealPlanData };
      const saveMealPlanResponse = await axios.post("http://localhost:3000/api/meals/save-mealplan", mealPlanPayload);

      if (saveMealPlanResponse.status < 200 || saveMealPlanResponse.status >= 300) {
        throw new Error("Failed to save meal plan");
      }
      console.log("Meal plan saved successfully:", saveMealPlanResponse.data);
    } catch (error) {
      console.error("Error testing endpoint:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-72 h-72 flex flex-col items-center justify-center text-xl font-bold">
        <p>Welcome to the Dashboard</p>
        <button
          onClick={generateMeals}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Generate Meals
        </button>
      </div>
    </div>
  );
};

export default Dashboard;