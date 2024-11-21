import React, { useState } from "react";

// Sample initial meal plan data (you would replace this with API data later)
const mealPlanData = [
  {
    day: "Day 1",
    meals: [
      { title: "Citrus Oatmeal", kcal: 466, protein: 19, fat: 11, carb: 76, mealType: "Breakfast" },
      { title: "Caramel Apple Pork Chops", kcal: 500, protein: 42, fat: 28, carb: 17, mealType: "Lunch" },
      { title: "Raspberry-Almond Jelly Roll", kcal: 500, protein: 7, fat: 28, carb: 56, mealType: "Dinner" },
    ],
  },
  {
    day: "Day 2",
    meals: [
      { title: "Fruit-and-Nut Peanut Butter Bites", kcal: 466, protein: 11, fat: 27, carb: 51, mealType: "Breakfast" },
      { title: "Bihari Kabab", kcal: 500, protein: 35, fat: 36, carb: 6, mealType: "Lunch" },
      { title: "Roasted Garlic-Herb Mushrooms", kcal: 499, protein: 10, fat: 34, carb: 50, mealType: "Dinner" },
    ],
  },
  {
    day: "Day 3",
    meals: [
      { title: "Berry Smoothie Bowl", kcal: 350, protein: 12, fat: 15, carb: 42, mealType: "Breakfast" },
    ],
  },
];

const MealPlanUI = () => {
  // State for meal plan data
  const [mealPlan, setMealPlan] = useState(mealPlanData);

  // State for filter controls
  const [selectedMealType, setSelectedMealType] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedHealth, setSelectedHealth] = useState("");
  const [selectedCuisineType, setSelectedCuisineType] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");
  const [caloriesRange, setCaloriesRange] = useState("");

  // Function to handle changes in filters
  const handleMealTypeChange = (event) => setSelectedMealType(event.target.value);
  const handleDietChange = (event) => setSelectedDiet(event.target.value);
  const handleHealthChange = (event) => setSelectedHealth(event.target.value);
  const handleCuisineTypeChange = (event) => setSelectedCuisineType(event.target.value);
  const handleDishTypeChange = (event) => setSelectedDishType(event.target.value);
  const handleCaloriesRangeChange = (event) => setCaloriesRange(event.target.value);

  // Function to fetch meal data based on filters (Simulated here with sample data)
  const fetchMealsFromAPI = () => {
    const queryParams = {
      diet: selectedDiet,
      health: selectedHealth,
      cuisineType: selectedCuisineType,
      mealType: selectedMealType,
      dishType: selectedDishType,
      calories: caloriesRange,
    };

    console.log("Fetching meals with the following filters:", queryParams);
    // Simulated API call
    // setMealPlan(fetchedMealsData);
  };

  // Filter the meal plan based on selected filters
  const filteredMealPlan = mealPlan.filter((dayPlan) => {
    const filteredMeals = dayPlan.meals.filter((meal) => {
      const mealTypeMatch = selectedMealType === "All" || selectedMealType === meal.mealType;
      return mealTypeMatch;
    });

    return filteredMeals.length > 0; // Only include days with filtered meals
  });

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
        {filteredMealPlan.map((dayPlan) => (
          <div key={dayPlan.day} className="day-plan mb-10">
            <h3 className="text-2xl text-center text-white">{dayPlan.day}</h3>
            <div className="meals">
              {dayPlan.meals.map((meal, index) => (
                <div key={index} className="meal mb-4 p-5 bg-gray-700 rounded-lg">
                  <h4 className="text-xl">{meal.title}</h4>
                  <p className="text-sm">
                    <span className="font-semibold">Calories:</span> {meal.kcal} kcal
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Protein:</span> {meal.protein}g
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Fat:</span> {meal.fat}g
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Carbs:</span> {meal.carb}g
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanUI;
