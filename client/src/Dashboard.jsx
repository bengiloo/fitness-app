import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import MealPlanUI from './MealPlanUI';
import GetStartedForm from './GetStartedForm';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const userEmail = localStorage.getItem('userEmail');
  console.log('User email from localStorage:', userEmail); // Debug log

  // Logout handler
  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('userEmail');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Content above the button - Split into Left and Right */}
      <div className="flex-1 flex">
        {/* Left Half - MealPlanUI (with margin to the left) */}
        <div className="flex-1 flex flex-col items-center p-4 ml-8">
          <MealPlanUI />
        </div>
        {/* Right Half - GetStartedForm */}
        <div className="flex-1 flex flex-col items-center p-4">
          <GetStartedForm />
        </div>
      </div>

      {/* Recipe Generator Button at Top Right (Even Smaller) */}
      <div className="absolute top-4 right-4">
        <Link to="/recipe-generator">
          <button className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-sm shadow-sm hover:bg-blue-700 transition-all duration-300">
            Go to Recipe Generator
          </button>
        </Link>
      </div>

      {/* Small Logout Button at Top Left (Even Smaller) */}
      {userEmail ? (
        <div className="absolute top-4 left-4">
          <button 
            onClick={handleLogout} 
            className="px-2 py-1 bg-red-500 text-white text-xs rounded-sm hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="absolute top-4 left-4">
          <button 
            disabled
            className="px-2 py-1 bg-gray-400 text-white text-xs rounded-sm cursor-not-allowed"
          >
            Logout (Not Logged In)
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
