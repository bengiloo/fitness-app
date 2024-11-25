import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import exercisesData from './constants/exercises.json'; // Assuming the JSON file is here
import axios from "axios";

const GetStartedForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: '',
    fitnessLevel: '',
    gender: '',
    age: 18,
    weight: 70,
    height: 170,
    fitnessGoals: [],
    equipment: [],
    availabilityDays: 3,  // Default to 3 days per week
  });

  // TODO: Needs use-case where if the user has no workout plan, the front end displays to the user "generate a workout plan"
  //       encouraging them to modify the drop down menus
  // TODO: Called when user logs in (un-comment when this component is ready)
  // useEffect(() => {
  //   const fetchWorkoutPlans = async () => {
  //     try {
  //       const email = localStorage.getItem("userEmail");
  //       if (!email) {
  //         throw new Error("User email not found in localStorage");
  //       }
  //       const response = await axios.post("http://localhost:3000/api/workouts/display-workoutplan", { email });

  //       console.log("The response from the frontend: ", response.data.plan);
  //       setWorkoutPlan(response.data.plan);
  //       // debug:
  //       console.log("use effect: ", workoutPlan);
  //     } catch (error) {
  //       console.error("Error fetching workout plan:", error.message);
  //     }
  //   };
  //   fetchWorkoutPlans();
  // }, []);

  const [workoutPlan, setWorkoutPlan] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedList = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData((prevData) => ({ ...prevData, [name]: updatedList }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the workout plan
    const generatedPlan = generateUniqueWorkoutPlan(formData.availabilityDays, formData.equipment, formData.fitnessLevel);

    // Set the workout plan state
    setWorkoutPlan(generatedPlan);

    // Optionally, log form data and workout plan as JSON string
    console.log("Form Data in JSON:", JSON.stringify(formData, null, 2));
    console.log("Generated Workout Plan in JSON:", JSON.stringify(generatedPlan, null, 2));

    // Save to database
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        throw new Error("User email not found in localStorage");
      }

      const workoutPlanPayload = { email, generatedPlan };
      const response = await axios.post("http://localhost:3000/api/workouts/save-workoutplan", workoutPlanPayload);

    } catch (error) {
      console.error("Error saving workout plan:", error);
    }
  };

  // Fetching workout data from JSON and applying filters 
  const filterExercises = (equipment, fitnessLevel) => {
    return exercisesData.filter(exercise => {
      // Filter based on equipment selection
      let equipmentMatch = false;
      if (equipment.includes('No equipment (bodyweight only)')) {
        equipmentMatch = ['Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Wide-Grip Rear Pull-Up', 'Superman', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Natural Glute Ham Raise', 'Push-Ups - Close Triceps Position', 'Russian Twist', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Incline Push-Ups', 'Tricep Dips'].includes(exercise.name);
      } else if (equipment.includes('Dumbbells only')) {
        equipmentMatch = ['Leg-Over Floor Press', 'Middle Back Shrug', 'Wide Stance Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Decline Dumbbell Flyes', 'Middle Back Shrug', 'Bent Over Two-Dumbbell Row', 'Dumbbell Squat', 'Dumbbell Bench Press', 'Dumbbell Bicep Curl', 'Stiff-Legged Dumbbell Deadlift', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover',].includes(exercise.name);
      } else if (equipment.includes('Access to full equipment (gym)')) {
        equipmentMatch = ['Standing Low-Pulley One-Arm Triceps Extension', 'Lying T-Bar Row', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Glute Ham Raise', 'Lunge Sprint', 'Decline Smith Press', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Ab Crunch Machine', 'Triceps Pushdown - V-Bar Attachment'].includes(exercise.name);
      }

      // Filter based on fitness level selection
      const levelMatch = fitnessLevel ? exercise.level === fitnessLevel : true;

      return equipmentMatch && levelMatch;
    });
  };

  const generateUniqueWorkoutPlan = (days, equipment, fitnessLevel) => {
    const workoutPrograms = {
      1: [
        {
          workout_type: 'Full Body',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex =>
            ['Superman', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Glute Ham Raise', 'Lunge Sprint', 'Middle Back Shrug', 'Natural Glute Ham Raise', 'Push-Ups - Close Triceps Position', 'Russian Twist', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Dumbbell Squats', 'Bent Over Two-Dumbbell Row', 'Stiff-Legged Dumbbell Deadlift', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Ab Crunch Machine', 'Triceps Pushdown - V-Bar Attachment',].includes(ex.name)
          ),
        },
      ],
      2: [
        {
          workout_type: 'Upper Body (Day 1)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
      3: [
        {
          workout_type: 'Upper Body (Day 1, 3)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
      4: [
        {
          workout_type: 'Upper Body (Day 1, 3)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2, 4)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
      5: [
        {
          workout_type: 'Upper Body (Day 1, 3, 5)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2, 4)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
      6: [
        {
          workout_type: 'Upper Body (Day 1, 3, 5)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2, 4, 6)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
      7: [
        {
          workout_type: 'Upper Body (Day 1, 3, 5, 7)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Standing Low-Pulley One-Arm Triceps Extension', 'Leg-Over Floor Press', 'Lying T-Bar Row', 'Frog Sit-Ups', 'Gorilla Chin/Crunch', 'Wide-Grip Rear Pull-Up', 'Decline Dumbbell Flyes', 'Decline Push-Up', 'Push Up to Side Plank', 'Body Tricep Press', 'Push-Ups With Feet Elevated', 'Wide-Grip Standing Barbell Curl', 'Full Range-Of-Motion Lat Pulldown', 'Push-Ups - Close Triceps Position', 'Single-Arm Push-Up', 'Wide-Grip Rear Pull-Up', 'Dumbbell Bicep Curl', 'Dumbbell Bench Press', 'Bent Over Two-Dumbbell Row', 'Dumbbell Shoulder Press', 'Zottman Curl', 'Tate Press', 'Straight-Arm Dumbbell Pullover', 'Decline Smith Press', 'Lying Close-Grip Bar Curl On High Pulley', 'Machine Shoulder (Military) Press', 'Triceps Pushdown - V-Bar Attachment'].includes(ex.name)),
        },
        {
          workout_type: 'Lower Body (Day 2, 4, 6)',
          exercises: filterExercises(equipment, fitnessLevel).filter(ex => ['Middle Back Shrug', 'Wide Stance Barbell Squat', 'Hyperextensions With No Hyperextension Bench', 'Russian Twist', 'Rear Leg Raises', 'Star Jump', 'Step-up with Knee Raise', 'Seated Calf Raise', 'Superman', 'Thigh Adductor', 'Glute Ham Raise', 'Barbell Lunge', 'Barbell Squat', 'Bent Over Two-Dumbbell Row', 'Dumbbell Step Ups', 'Standing Dumbbell Calf Raise', 'Dumbbell Lunges', 'Dumbbell Squat', 'Glute Ham Raise', 'Lunge Sprint', 'Natural Glute Ham Raise', 'Split Squats', 'Sit Squats', 'Side Leg Raises', 'Reverse Crunch', 'Plyo Push-up', 'Plank', 'Oblique Crunches', 'Dumbbell Squats', 'Stiff-Legged Dumbbell Deadlift', 'Calf Press On The Leg Press Machine', 'Smith Machine Leg Press', 'Ab Crunch Machine'].includes(ex.name)),
        },
      ],
    };

    // Hard-coding sets and reps for each exercise
    let selectedProgram = workoutPrograms[days] || [];

    return selectedProgram.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => ({
        ...exercise,
        sets: 3,  // Hardcoding 3 sets for each exercise
        reps: 10, // Hardcoding 10 reps for each exercise
      })),
    }));
  };

  // State to track expanded instruction for each exercise
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleInstruction = (exerciseName) => {
    setExpandedExercise(expandedExercise === exerciseName ? null : exerciseName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
    <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg overflow-y-auto max-h-screen">
        <div className="text-center mb-6">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-sans mb-4 text-center text-white/80">Create Your Custom Workout Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="p-5 bg-gray-800 rounded-lg shadow-lg mb-5">
              <h3 className="text-xl font-sans mb-4 text-center text-white/80">Step 1: Fitness Level & Goals</h3>

              {/* Fitness Level */}
              <div className="mb-4">
                <label className="block">Fitness Level</label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                >
                  <option value="">Select your fitness level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>

                </select>
              </div>

              {/* Fitness Goals */}
<div className="mb-4">
  <label className="block">Fitness Goals</label>
  <div className="space-y-2">
    <label className="flex items-center text-white">
      <input
        type="checkbox"
        name="fitnessGoals"
        value="muscleGain"
        checked={formData.fitnessGoals.includes('muscleGain')}
        onChange={handleChange}
        className="mr-2"
      />
      Muscle Gain
    </label>
    <label className="flex items-center text-white">
      <input
        type="checkbox"
        name="fitnessGoals"
        value="weightLoss"
        checked={formData.fitnessGoals.includes('weightLoss')}
        onChange={handleChange}
        className="mr-2"
      />
      Weight Loss
    </label>
    <label className="flex items-center text-white">
      <input
        type="checkbox"
        name="fitnessGoals"
        value="strength"
        checked={formData.fitnessGoals.includes('strength')}
        onChange={handleChange}
        className="mr-2"
      />
      Strength
    </label>
    <label className="flex items-center text-white">
      <input
        type="checkbox"
        name="fitnessGoals"
        value="endurance"
        checked={formData.fitnessGoals.includes('endurance')}
        onChange={handleChange}
        className="mr-2"
      />
      Endurance
    </label>
  </div>
</div>

              {/* Availability Days */}
              <div className="mb-4">
                <label className="block">How many days per week do you want to work out?</label>
                <select
                  name="availabilityDays"
                  value={formData.availabilityDays}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                >
                  <option value="1">1 Day per Week</option>
                  <option value="2">2 Days per Week</option>
                  <option value="3">3 Days per Week</option>
                  <option value="4">4 Days per Week</option>
                  <option value="5">5 Days per Week</option>
                  <option value="6">6 Days per Week</option>
                  <option value="7">7 Days per Week</option>
                </select>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-sans mb-4">Step 2: Select Your Equipment</h3>

              {/* Equipment */}
              <div className="mb-4">
                <label className="block">Select your equipment</label>
                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                >
                  <option value="No equipment (bodyweight only)">No equipment (bodyweight only)</option>
                  <option value="Dumbbells only">Dumbbells only</option>
                  <option value="Access to full equipment (gym)">Access to full equipment (gym)</option>
                </select>
              </div>


              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-500 rounded-md hover:bg-gray-600"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Generate Plan
                </button>
              </div>
            </div>
          )}
        </form>

        {workoutPlan.length > 0 ? (
  <div className="mt-8 space-y-6">
    {workoutPlan.map((workout, index) => (
      <div key={index}>
        <h3 className="text-2xl font-sans mb-4">{workout.workout_type}</h3>
        <div className="space-y-4">
          {workout.exercises.map((exercise, i) => (
            <div key={i} className="border-b border-gray-700 pb-4">
              <h4 className="text-lg font-sans">{exercise.name}</h4>
              <p>{exercise.sets} sets of {exercise.reps} reps</p>

              <button
                onClick={() => toggleInstruction(exercise.name)}
                className="text-blue-400 hover:underline mt-2"
              >
                {expandedExercise === exercise.name ? 'Hide Instructions' : 'Show Instructions'}
              </button>

              {expandedExercise === exercise.name && (
                <ul className="mt-4 space-y-2 list-inside">
                  {exercise.instructions.map((instruction, idx) => (
                    <li key={idx} className="text-sm text-gray-300">{instruction}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="mt-8">
  {/* Adding the new heading above the fallback message */}
  <h2 className="text-3xl text-center text-white mb-5">Your Workout Plan</h2>
  <div className="text-center text-gray-400"> No workout available. Try applying the filters or fetching workout plan.
  </div>
  </div>
)}
      </div>
    </div>
  );
};

export default GetStartedForm;
