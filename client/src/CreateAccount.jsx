import React from 'react';
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {

  const [user, setUser] = useState(null);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Needs to be tested more (Postman)
    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        email,
        password,
        firstname,
        lastname
      });
      setUser(res.data);
      localStorage.setItem(email);
      navigate('/dashboard');
    } catch (err) {
      setError(true);
      console.error("Registration has failed: ", err);
    }
  }

  
  return (
    <div className="min-h-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-2xl ring-4 ring-blue-500 ring-opacity-50">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white-700 mb-6">Create Your Account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* First Name and Last Name Input */}
          <div className="flex mb-4 space-x-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="block text-white-600 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="first-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="last-name" className="block text-white-600 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="last-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
