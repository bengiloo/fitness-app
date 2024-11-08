import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GetStartedForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: '',
    fitnessLevel: '',
    weight: '',
    height: '',
    availability: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add submit functionality here
  };

  // Handle availability radio buttons (one time slot per day)
  const handleAvailabilityChange = (day, timeSlot) => {
    setFormData((prevData) => {
      const availability = { ...prevData.availability };
      availability[day] = { [timeSlot]: true };  // Set only the chosen time slot for the day
      return { ...prevData, availability };
    });
  };

  // Sample time slots for availability
  const timeSlots = ['Morning', 'Afternoon', 'Evening'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-black rounded-lg shadow-lg">
        
        {/* Back to Home Button */}
        <div className="text-center mb-6">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Get Started with Your Fitness Journey</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Step 1: Experience */}
          {step === 1 && (
            <div>
              <label className="block mb-2">Experience Level</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Describe your experience level"
              />
              <button onClick={handleNext} type="button" className="mt-4 bg-blue-600 py-2 px-4 rounded">Next</button>
            </div>
          )}

          {/* Step 2: Fitness Level */}
          {step === 2 && (
            <div>
              <label className="block mb-2">Fitness Level</label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <button onClick={handleBack} type="button" className="mt-4 mr-4 bg-gray-500 py-2 px-4 rounded">Back</button>
              <button onClick={handleNext} type="button" className="mt-4 bg-blue-600 py-2 px-4 rounded">Next</button>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div>
              {/* Weight Selection */}
              <label className="block mb-2">Weight (kg)</label>
              <select
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-10 overflow-y-scroll"
              >
                <option value="">Select Weight</option>
                {Array.from({ length: 200 }, (_, i) => i + 30).map((weight) => (
                  <option key={weight} value={weight}>{weight} kg</option>
                ))}
              </select>

              {/* Height Selection */}
              <label className="block mt-4 mb-2">Height (cm)</label>
              <select
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-10 overflow-y-scroll"
              >
                <option value="">Select Height</option>
                {Array.from({ length: 121 }, (_, i) => i + 100).map((height) => (
                  <option key={height} value={height}>{height} cm</option>
                ))}
              </select>

              <button onClick={handleBack} type="button" className="mt-4 mr-4 bg-gray-500 py-2 px-4 rounded">Back</button>
              <button onClick={handleNext} type="button" className="mt-4 bg-blue-600 py-2 px-4 rounded">Next</button>
            </div>
          )}

          {/* Step 4: Availability */}
          {step === 4 && (
            <div>
              <label className="block mb-4">Availability</label>
              <div className="grid grid-cols-4 gap-2 text-center">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="col-span-1">
                    <h3 className="font-bold mb-2">{day}</h3>
                    {timeSlots.map((timeSlot) => (
                      <div key={timeSlot} className="flex items-center mb-2">
                        <input
                          type="radio"
                          id={`${day}-${timeSlot}`}
                          name={day} // Use day as the radio group name
                          checked={formData.availability[day]?.[timeSlot] || false}
                          onChange={() => handleAvailabilityChange(day, timeSlot)}
                          className="mr-2"
                        />
                        <label htmlFor={`${day}-${timeSlot}`}>{timeSlot}</label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <button onClick={handleBack} type="button" className="mt-4 mr-4 bg-gray-500 py-2 px-4 rounded">Back</button>
              <button type="submit" className="mt-4 bg-green-600 py-2 px-4 rounded">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GetStartedForm;
