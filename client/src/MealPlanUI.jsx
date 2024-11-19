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
    <div style={mealPlanStyles.container}>
      {/* Filters Section */}
      <div style={mealPlanStyles.filtersContainer}>
        <h2 style={mealPlanStyles.filtersHeader}>Filter Your Meal Plan</h2>
        <div style={mealPlanStyles.filtersGrid}>
          <label style={mealPlanStyles.filterLabel}>
            Meal Type:
            <select value={selectedMealType} onChange={handleMealTypeChange} style={mealPlanStyles.filterSelect}>
              <option value="All">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Teatime">Teatime</option>
            </select>
          </label>

          <label style={mealPlanStyles.filterLabel}>
            Diet:
            <select value={selectedDiet} onChange={handleDietChange} style={mealPlanStyles.filterSelect}>
              <option value="">Any Diet</option>
              <option value="balanced">Balanced</option>
              <option value="high-fiber">High-Fiber</option>
              <option value="high-protein">High-Protein</option>
              <option value="low-carb">Low-Carb</option>
              <option value="low-fat">Low-Fat</option>
              <option value="low-sodium">Low-Sodium</option>
            </select>
          </label>

          <label style={mealPlanStyles.filterLabel}>
            Health:
            <select value={selectedHealth} onChange={handleHealthChange} style={mealPlanStyles.filterSelect}>
              <option value="">Any Health</option>
              <option value="alcohol-free">Alcohol-Free</option>
              <option value="dairy-free">Dairy-Free</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="keto-friendly">Keto-Friendly</option>
              <option value="low-sugar">Low-Sugar</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </label>

          <label style={mealPlanStyles.filterLabel}>
            Cuisine Type:
            <select value={selectedCuisineType} onChange={handleCuisineTypeChange} style={mealPlanStyles.filterSelect}>
              <option value="">Any Cuisine</option>
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

          <label style={mealPlanStyles.filterLabel}>
            Dish Type:
            <select value={selectedDishType} onChange={handleDishTypeChange} style={mealPlanStyles.filterSelect}>
              <option value="">Any Dish</option>
              <option value="biscuits and cookies">Biscuits and Cookies</option>
              <option value="bread">Bread</option>
              <option value="cereals">Cereals</option>
              <option value="condiments and sauces">Condiments and Sauces</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
              <option value="main course">Main Course</option>
              <option value="pancake">Pancake</option>
              <option value="salad">Salad</option>
              <option value="sandwiches">Sandwiches</option>
              <option value="side dish">Side Dish</option>
              <option value="soup">Soup</option>
              <option value="starter">Starter</option>
              <option value="sweets">Sweets</option>
            </select>
          </label>

          <label style={mealPlanStyles.filterLabel}>
            Calorie Range:
            <input
              type="text"
              value={caloriesRange}
              onChange={handleCaloriesRangeChange}
              style={mealPlanStyles.filterInput}
              placeholder="e.g. 100-150"
            />
          </label>
        </div>

        <button onClick={fetchMealsFromAPI} style={mealPlanStyles.fetchButton}>
          Fetch Meals
        </button>
      </div>

      {/* Displaying filtered meal plan */}
      {filteredMealPlan.length === 0 ? (
        <p style={{ color: "#fff", textAlign: "center" }}>No meals match the selected filters.</p>
      ) : (
        filteredMealPlan.map((dayPlan, dayIndex) => (
          <div key={dayIndex} style={mealPlanStyles.daySection}>
            <h2 style={mealPlanStyles.dayTitle}>{dayPlan.day}</h2>
            <div style={mealPlanStyles.mealList}>
              {dayPlan.meals.map((meal, mealIndex) => (
                <div key={mealIndex} style={mealPlanStyles.mealCard}>
                  <h3 style={mealPlanStyles.mealTitle}>{meal.title}</h3>
                  <p style={mealPlanStyles.mealInfo}>Calories: {meal.kcal}</p>
                  <p style={mealPlanStyles.mealInfo}>Protein: {meal.protein}g</p>
                  <p style={mealPlanStyles.mealInfo}>Fat: {meal.fat}g</p>
                  <p style={mealPlanStyles.mealInfo}>Carbs: {meal.carb}g</p>
                  <p style={mealPlanStyles.mealInfo}>Meal Type: {meal.mealType}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Styles for the component
const mealPlanStyles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#282c34",
    color: "#fff",
    borderRadius: "8px",
  },

  // Filter styles
  filtersContainer: {
    padding: "20px",
    backgroundColor: "#1a1d2f",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    marginBottom: "20px",
  },

  filtersHeader: {
    fontSize: "1.5em",
    marginBottom: "10px",
    textAlign: "center",
    color: "#ffffffcc",
  },

  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  filterLabel: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9em",
    color: "#fff",
  },

  filterSelect: {
    marginTop: "5px",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#2c2f42",
    color: "#fff",
    border: "1px solid #444",
  },

  filterInput: {
    marginTop: "5px",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#2c2f42",
    color: "#fff",
    border: "1px solid #444",
  },

  fetchButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1em",
    cursor: "pointer",
    marginTop: "20px",
  },

  // Meal plan display styles
  daySection: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#3a3f4f",
    borderRadius: "8px",
  },

  dayTitle: {
    fontSize: "1.2em",
    marginBottom: "10px",
  },

  mealList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },

  mealCard: {
    padding: "10px",
    backgroundColor: "#4b5161",
    borderRadius: "8px",
    textAlign: "center",
  },

  mealTitle: {
    fontSize: "1.1em",
    marginBottom: "10px",
  },

  mealInfo: {
    fontSize: "0.9em",
    margin: "5px 0",
  },
};

export default MealPlanUI;
