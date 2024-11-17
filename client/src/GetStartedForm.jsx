import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    availabilityDays: 3,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate the actual workout for each day based on the user's input
    const generatedPlan = generateUniqueWorkoutPlan(formData.availabilityDays, formData.equipment, formData.fitnessLevel);
    
    // Set the workout plan state
    setWorkoutPlan(generatedPlan);
  };

  // Helper function to generate range of numbers for age, height, and weight
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  // Function to generate a unique workout plan based on the number of days the user is available and their equipment choice
  const generateUniqueWorkoutPlan = (days, equipment, fitnessLevel) => {
    const workoutPrograms = {
      2: [
        {
          workout_type: 'Upper Body',
          exercises: filterExercisesByEquipment([
            { name: 'Bench Press', sets: 3, reps: 10 },
            { name: 'Bent Over Rows', sets: 3, reps: 10 },
            { name: 'Shoulder Press', sets: 3, reps: 12 },
            { name: 'Push-Ups', sets: 3, reps: 12 },
            { name: 'Bench Press', sets: 3, reps: 10 },
            { name: 'Deadlifts', sets: 4, reps: 8 },
          ], equipment),
        },
        {
          workout_type: 'Lower Body',
          exercises: filterExercisesByEquipment([
            { name: 'Squats', sets: 4, reps: 10 },
            { name: 'Lunges', sets: 3, reps: 12 },
            { name: 'Calf Raises', sets: 3, reps: 15 },
          ], equipment),
        },
      ],
      3: [
        {
          workout_type: 'Chest and Triceps',
          exercises: filterExercisesByEquipment([
            { name: 'Bench Press', sets: 3, reps: 10 },
            { name: 'Dumbbell Flyes', sets: 3, reps: 12 },
            { name: 'Tricep Dips', sets: 3, reps: 10 },
            { name: 'Push-Ups', sets: 3, reps: 12 }, // added Push-Ups for bodyweight
            { name: 'Overhead Tricep Extension', sets: 3, reps: 12 }, // added dumbbell exercise for triceps
          ], equipment),
        },
        {
          workout_type: 'Back and Biceps',
          exercises: filterExercisesByEquipment([
            { name: 'Deadlifts', sets: 4, reps: 8 },
            { name: 'Bent-Over Rows', sets: 4, reps: 10 },
            { name: 'Hammer Curls', sets: 3, reps: 12 },
            { name: 'Pull-Ups', sets: 3, reps: 8 },
            { name: 'Bicep Curls', sets: 3, reps: 12 },
            { name: 'Bodyweight Rows', sets: 3, reps: 12 },
            { name: 'Superman Exercise', sets: 3, reps: 15 },
            { name: 'Towel Rows', sets: 3, reps: 10 },
            { name: 'Reverse Snow Angels', sets: 3, reps: 15 },
            { name: 'Chin-Ups', sets: 3, reps: 6 },
            { name: 'Prone Y Raises', sets: 3, reps: 12 },
            { name: 'Plank Rows', sets: 3, reps: 8 },
            { name: 'Wall Push-Ups', sets: 3, reps: 15 },
            { name: 'Wide Push-Ups', sets: 3, reps: 12 },
            { name: 'Scapular Pull-Ups', sets: 3, reps: 10 },
          ], equipment),
        }
        ,
        {
          workout_type: 'Legs and Shoulders',
          exercises: filterExercisesByEquipment([
            { name: 'Squats', sets: 4, reps: 10 },
            { name: 'Shoulder Press', sets: 3, reps: 12 },
            { name: 'Lunges', sets: 3, reps: 12 },
          ], equipment),
        },
      ],
      4: [
        {
          workout_type: 'Chest and Triceps',
          exercises: filterExercisesByEquipment([
            { name: 'Incline Press', sets: 3, reps: 10 },
            { name: 'Close Grip Bench', sets: 3, reps: 10 },
            { name: 'Dumbbell Kickbacks', sets: 3, reps: 12 },
            { name: 'Tricep Dips', sets: 3, reps: 12 },
            { name: 'Push-Ups', sets: 3, reps: 12 }, 
            { name: 'Incline Push-Ups', sets: 3, reps: 12 },
            { name: 'Dumbbell Flyes', sets: 3, reps: 12 },
            { name: 'Dumbbell Chest Press', sets: 3, reps: 12 },
            { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
            { name: 'Chest Flyes', sets: 3, reps: 12 }, // added Chest Flyes for chest
          ], equipment),
        },
        {
          workout_type: 'Back and Biceps',
          exercises: filterExercisesByEquipment([
            { name: 'Bent Rows', sets: 4, reps: 8 },
            { name: 'Pull-Ups', sets: 3, reps: 10 },
            { name: 'Concentration Curls', sets: 3, reps: 12 },
            { name: 'Hammer Curls', sets: 3, reps: 12 },
            { name: 'Diamond Push-ups', sets: 3, reps: 12 },
            { name: 'Superman Exercise', sets: 3, reps: 12 },
            { name: 'Plank to Push-Up', sets: 3, reps: 12 },
            { name: 'Towel Curls', sets: 3, reps: 12 },
            { name: 'Dumbbell Rows', sets: 3, reps: 12 },
            { name: 'Dumbbell Reverse Flyes', sets: 3, reps: 12 },
            { name: 'Barbell Curls', sets: 3, reps: 10 }, // added Barbell Curls for biceps
          ], equipment),
        },
        {
          workout_type: 'Shoulders and Abs',
          exercises: filterExercisesByEquipment([
            { name: 'Lateral Raises', sets: 3, reps: 12 },
            { name: 'Dumbbell Shoulder Press', sets: 3, reps: 12 },
            { name: 'Dumbbell Russian Twists', sets: 3, reps: 12 },
            { name: 'Dumbbell Crunches', sets: 3, reps: 12 },
            { name: 'Shrugs', sets: 4, reps: 10 },
            { name: 'Planks', sets: 3, reps: 1 }, // hold for 1 minute
          ], equipment),
        },
        {
          workout_type: 'Legs',
          exercises: filterExercisesByEquipment([
            { name: 'Squats', sets: 4, reps: 10 },
            { name: 'Deadlifts', sets: 3, reps: 10 },
            { name: 'Lunges', sets: 3, reps: 12 },
          ], equipment),
        },
      ],
    };

    // Adjust workouts based on fitness level
    let selectedProgram = workoutPrograms[days] || [];

    return selectedProgram.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => ({
        ...exercise,
        sets: adjustSetsByFitnessLevel(exercise.sets, fitnessLevel),
        reps: adjustRepsByFitnessLevel(exercise.reps, fitnessLevel),
      })),
    }));
  };

  // Filter exercises based on available equipment
  const filterExercisesByEquipment = (exercises, equipment) => {
    return exercises.filter((exercise) => {
      if (equipment.includes('No equipment (bodyweight only)')) {
        return ['Squats', 'Push-Ups', 'Lunges', 'Planks', 'Incline Push-Ups','Tricep Dips', 'Superman Exercise', 'Plank to Push-Up', 'Diamond Push-ups', 'Towel Curls', 'Towel Rows'].includes(exercise.name);
      } else if (equipment.includes('Dumbbells only')) {
        return ['Dumbbell Flyes', 'Hammer Curls', 'Dumbbell Kickbacks', 'Bicep Curls', 'Overhead Tricep Extension','Incline Dumbbell Press', 'Dumbbell Chest Press', 'Dumbbell Rows','Dumbbell Reverse Flyes', 'Lateral Raises','Dumbbell Shoulder Press','Dumbbell Russian Twists','Dumbbell Crunches', 'Squats', 'Lunges','Deadlifts'].includes(exercise.name);
      } else if (equipment.includes('Access to full equipment (gym)')) {
        return true; // Allow all exercises
      }
      return true;
    });
  };

  // Adjust sets based on fitness level
  const adjustSetsByFitnessLevel = (sets, fitnessLevel) => {
    switch (fitnessLevel) {
      case 'beginner': return Math.max(1, sets - 1);
      case 'intermediate': return sets;
      case 'advanced': return sets + 1;
      case 'expert': return sets + 2;
      default: return sets;
    }
  };

  // Adjust reps based on fitness level
  const adjustRepsByFitnessLevel = (reps, fitnessLevel) => {
    switch (fitnessLevel) {
      case 'beginner': return Math.max(8, reps - 2);
      case 'intermediate': return reps;
      case 'advanced': return reps + 2;
      case 'expert': return reps + 4;
      default: return reps;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-black rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4">Create Your Custom Workout Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Step 1: Fitness Level & Goals</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium">What is your fitness level?</label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">What are your fitness goals?</label>
                <div className="space-y-2 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="Lose Weight"
                      name="fitnessGoals"
                      checked={formData.fitnessGoals.includes('Lose Weight')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">Lose Weight</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="Build Muscle"
                      name="fitnessGoals"
                      checked={formData.fitnessGoals.includes('Build Muscle')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">Build Muscle</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="Increase Strength"
                      name="fitnessGoals"
                      checked={formData.fitnessGoals.includes('Increase Strength')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">Increase Strength</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">How many days per week do you want to work out?</label>
                <select
                  name="availabilityDays"
                  value={formData.availabilityDays}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                >
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
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
              <h3 className="text-xl font-semibold mb-4">Step 2: Choose Your Equipment</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium">What equipment do you have?</label>
                <div className="space-y-2 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="No equipment (bodyweight only)"
                      name="equipment"
                      checked={formData.equipment.includes('No equipment (bodyweight only)')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">No equipment (bodyweight only)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="Dumbbells only"
                      name="equipment"
                      checked={formData.equipment.includes('Dumbbells only')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">Dumbbells only</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value="Access to full equipment (gym)"
                      name="equipment"
                      checked={formData.equipment.includes('Access to full equipment (gym)')}
                      onChange={handleChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">Access to full equipment (gym)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Generate Workout Plan
                </button>
              </div>
            </div>
          )}
        </form>

        {workoutPlan.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Your Custom Workout Plan</h3>
            {workoutPlan.map((workout, index) => (
              <div key={index} className="mt-4">
                <h4 className="text-lg font-bold">{workout.workout_type}</h4>
                <ul className="list-disc pl-5">
                  {workout.exercises.map((exercise, idx) => (
                    <li key={idx}>
                      {exercise.name}: {exercise.sets} sets of {exercise.reps} reps
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStartedForm;
