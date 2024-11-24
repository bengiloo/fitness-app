import React, { useState, useEffect } from "react";
import axios from "axios";

const MealPlanUI = () => {
  // State for meal plan data
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filter controls
  const [selectedMealType, setSelectedMealType] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedHealth, setSelectedHealth] = useState("");
  const [selectedCuisineType, setSelectedCuisineType] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");
  const [caloriesRange, setCaloriesRange] = useState("");

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          throw new Error("User email not found in localStorage");
        }
        const response = await axios.post("http://localhost:3000/api/meals/display-mealplan", { email });

        // console.log("The response from the frontend: ", response.data.mealPlanData);
        setMealPlan(response.data.mealPlanData);
        // debug:
        console.log("use effect: ", mealPlan);
      } catch (error) {
        console.error("Error fetching meal plans:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMealPlans();
  }, []);

  // Function to handle changes in filters
  const handleMealTypeChange = (event) => setSelectedMealType(event.target.value);
  const handleDietChange = (event) => setSelectedDiet(event.target.value);
  const handleHealthChange = (event) => setSelectedHealth(event.target.value);
  const handleCuisineTypeChange = (event) => setSelectedCuisineType(event.target.value);
  const handleDishTypeChange = (event) => setSelectedDishType(event.target.value);
  const handleCaloriesRangeChange = (event) => setCaloriesRange(event.target.value);

  // Function to fetch meal data based on filters (Simulated here with sample data)
  const fetchMealsFromAPI = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      throw new Error("User email not found in localStorage");
    }

    // Use this to call the backend for the api
    const queryParams = {
      diet: selectedDiet,
      health: selectedHealth,
      cuisineType: selectedCuisineType,
      mealType: selectedMealType,
      dishType: selectedDishType, // Do not include this
      calories: caloriesRange,
    };

    // api call (edamame):
    const response = await axios.post("http://localhost:3000/api/meals/fetch-meal", {
      queryParams
    });

    // Debug purposes:
    console.log("Fetched Meal data from front end:", response);
    const mealPlanData = [];

    // display data to the console for debugging purposes:
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

      // Push a meal to the mealplan list
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
    // Save meal plan data to db:
    const mealPlanPayload = { email, mealPlanData };
    const saveMealPlanResponse = await axios.post("http://localhost:3000/api/meals/save-mealplan", mealPlanPayload);

    if (saveMealPlanResponse.status < 200 || saveMealPlanResponse.status >= 300) {
      throw new Error("Failed to save meal plan");
    }

    //Debug lines:
    console.log("This is the user's email: ", email);
    console.log("Fetching meals with the following filters:", queryParams);
    setMealPlan(mealPlanData);
  };

  // Filter the meal plan based on selected filters
  const filteredMealPlan = mealPlan
    .map((dayPlan) => {
      const filteredMeals = (dayPlan.meals || []).filter((meal) => {
        const mealTypeMatch = selectedMealType === "All" || selectedMealType === meal.mealType;
        return mealTypeMatch;
      });

      return { ...dayPlan, meals: filteredMeals };
    })
    .filter((dayPlan) => dayPlan.meals.length > 0);

  return (
    <div className="font-sans p-5 max-w-screen-md mx-auto bg-gray-900 text-white rounded-lg">
      {/* Filters Section */}
      <div className="p-5 bg-gray-800 rounded-lg shadow-lg mb-5">
        <h2 className="text-2xl mb-4 text-center text-white/80">Filter Your Meal Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <label className="flex flex-col text-sm text-white">
            Meal Type:
            <select
              value={selectedMealType}
              onChange={handleMealTypeChange}
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Teatime">Teatime</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-white">
            Diet:
            <select
              value={selectedDiet}
              onChange={handleDietChange}
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="">Any Diet</option>
              <option value="balanced">Balanced</option>
              <option value="high-fiber">High-Fiber</option>
              <option value="high-protein">High-Protein</option>
              <option value="low-carb">Low-Carb</option>
              <option value="low-fat">Low-Fat</option>
              <option value="low-sodium">Low-Sodium</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-white">
            Health:
            <select
              value={selectedHealth}
              onChange={handleHealthChange}
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="">Any Health</option>
              <option value="alcohol-cocktail">Alcohol-Cocktail</option>
              <option value="alcohol-free">Alcohol-Free</option>
              <option value="celery-free">Celery-Free</option>
              <option value="crustacean-free">Crustacean-Free</option>
              <option value="dairy-free">Dairy-Free</option>
              <option value="DASH">DASH</option>
              <option value="egg-free">Egg-Free</option>
              <option value="fish-free">Fish-Free</option>
              <option value="fodmap-free">Fodmap-Free</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="immuno-supportive">Immuno-Supportive</option>
              <option value="keto-friendly">Keto-Friendly</option>
              <option value="kidney-friendly">Kidney-Friendly</option>
              <option value="kosher">Kosher</option>
              <option value="low-fat-abs">Low-Fat-Abs</option>
              <option value="low-potassium">Low-Potassium</option>
              <option value="low-sugar">Low-Sugar</option>
              <option value="lupine-free">Lupine-Free</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="mollusk-free">Mollusk-Free</option>
              <option value="mustard-free">Mustard-Free</option>
              <option value="no-oil-added">No-Oil-Added</option>
              <option value="paleo">Paleo</option>
              <option value="peanut-free">Peanut-Free</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="pork-free">Pork-Free</option>
              <option value="red-meat-free">Red-Meat-Free</option>
              <option value="sesame-free">Sesame-Free</option>
              <option value="shellfish-free">Shellfish-Free</option>
              <option value="soy-free">Soy-Free</option>
              <option value="sugar-conscious">Sugar-Conscious</option>
              <option value="sulfite-free">Sulfite-Free</option>
              <option value="tree-nut-free">Tree-Nut-Free</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="wheat-free">Wheat-Free</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-white">
            Cuisine Type:
            <select
              value={selectedCuisineType}
              onChange={handleCuisineTypeChange}
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="American">American</option>
              <option value="Asian">Asian</option>
              <option value="British">British</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Chinese">Chinese</option>
              <option value="Eastern Europe">Eastern Europe</option>
              <option value="French">French</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Kosher">Kosher</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Mexican">Mexican</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="Nordic">Nordic</option>
              <option value="South American">South American</option>
              <option value="South East Asian">South East Asian</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-white">
            Dish Type:
            <select
              value={selectedDishType}
              onChange={handleDishTypeChange}
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="Biscuits and cookies">Biscuits and cookies</option>
              <option value="Bread">Bread</option>
              <option value="Cereals">Cereals</option>
              <option value="Condiments and sauces">Condiments and sauces</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
              <option value="Main course">Main course</option>
              <option value="Pancake">Pancake</option>
              <option value="Preps">Preps</option>
              <option value="Preserve">Preserve</option>
              <option value="Salad">Salad</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Side dish">Side dish</option>
              <option value="Soup">Soup</option>
              <option value="Starter">Starter</option>
              <option value="Sweets">Sweets</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-white">
            Calories Range:
            <input
              type="text"
              value={caloriesRange}
              onChange={handleCaloriesRangeChange}
              placeholder="e.g. 100-200"
              className="mt-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </label>

          <div className="col-span-full">
            <button
              onClick={fetchMealsFromAPI}
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Meal Plan */}
      <div className="meal-plan">
        <h2 className="text-3xl text-center text-white mb-5">Your Meal Plan</h2>
        {mealPlan.length > 0 ? (
          <div>
            {mealPlan.map((meal, index) => (
              <div key={index} className="meal mb-6 p-5 bg-gray-700 rounded-lg">
                <h3 className="text-2xl text-blue-300">{meal.mealName}</h3>
                <p className="text-sm text-gray-300">
                  <strong>Type of Meal:</strong> {meal.typeOfMeal}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Fats:</strong> {meal.nutrients.fats}g
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Carbs:</strong> {meal.nutrients.carbs}g
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Protein:</strong> {meal.nutrients.protein}g
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Calories:</strong> {meal.nutrients.calories} kcal
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No meals available. Try applying filters or fetching meals.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlanUI;
