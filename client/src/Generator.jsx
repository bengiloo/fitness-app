import React, { useState } from 'react';
import GetStartedForm from './GetStartedForm';
import PlanDisplay from './PlanDisplay';

const Generator = () => {
    const [workout, setWorkout] = useState([]);
    const [nutrition, setNutrition] = useState([]);
  
    const generateWorkout = (goal, experience) => {
        const workouts = {
          weight_loss: {
            beginner: ['Jogging', 'Bodyweight Squats', 'Push-ups'],
            intermediate: ['HIIT', 'Kettlebell Swings', 'Burpees'],
            advanced: ['Sprints', 'CrossFit WODs', 'Olympic Lifting']
          },
          muscle_gain: {
            beginner: ['Bodyweight Push-ups', 'Dumbbell Rows', 'Lunges'],
            intermediate: ['Squats', 'Bench Press', 'Deadlifts'],
            advanced: ['Powerlifting', 'Olympic Lifting', 'Advanced Split Training']
          },
          general_fitness: {
            beginner: ['Walking', 'Yoga', 'Plank'],
            intermediate: ['Cycling', 'Swimming', 'Rowing'],
            advanced: ['CrossFit', 'Track Sprints', 'Resistance Bands']
          }
        };
      
        return workouts[goal][experience] || [];
      };

      const generateNutrition = (goal, diet) => {
        const nutritionPlans = {
          weight_loss: {
            balanced: ['Low-calorie vegetables', 'Lean protein', 'Healthy fats'],
            keto: ['High-fat foods', 'Avocados', 'Eggs'],
            vegan: ['Tofu', 'Quinoa', 'Leafy greens'],
          },
          muscle_gain: {
            balanced: ['Complex carbs', 'Chicken breast', 'Brown rice'],
            keto: ['Meat, fish', 'Leafy greens', 'Nuts'],
            vegan: ['Legumes', 'Tofu', 'Quinoa'],
          },
          general_fitness: {
            balanced: ['Oats', 'Chicken breast', 'Vegetables'],
            keto: ['Salmon', 'Spinach', 'Eggs'],
            vegan: ['Beans', 'Rice', 'Broccoli'],
          }
        };
      
        return nutritionPlans[goal][diet] || [];
      };

      const handleGenerate = ({ goal, experience, diet }) => {
        const workoutPlan = generateWorkout(goal, experience);
        const nutritionPlan = generateNutrition(goal, diet);
        setWorkout(workoutPlan);
        setNutrition(nutritionPlan);
      };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <GetStartedForm onGenerate={handleGenerate} />
        {workout.length > 0 && <PlanDisplay workout={workout} nutrition={nutrition} />}
      </div>
    </div>
  )
}

export default Generator
