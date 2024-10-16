import React from 'react';

const CreateAccount = () => {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-2xl ring-4 ring-blue-500 ring-opacity-50">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white-700 mb-6">Create Your Account</h2>
        
        <form>
          {/* First Name and Last Name Input */}
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="block text-white-600 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="first-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="last-name" className="block text-white-600 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="last-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white-600 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white-600 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-white-600 text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-white-600 mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default CreateAccount;
