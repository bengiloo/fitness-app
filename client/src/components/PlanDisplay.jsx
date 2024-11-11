const PlanDisplay = ({ workout, nutrition }) => {
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Your Workout Plan</h3>
      <ul className="list-disc pl-5">
        {workout.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-4">Your Nutrition Plan</h3>
      <ul className="list-disc pl-5">
        {nutrition.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  );
};