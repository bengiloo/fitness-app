import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Api request goes here:
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password
      });
      setUser(res.data);
      // Here store user email in local storage
      console.log(res.data.email);
      localStorage.setItem('userEmail', res.data.email);
      setSuccess(true);
      navigate('/dashboard');
    } catch (err) {
      setError(true);
      console.error("Login has failed:", err);
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-2xl ring-4 ring-blue-500 ring-opacity-50">
        <div className="w-full max-w-sm p-8 bg-black rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-white-700 mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password Link (Need to implement this still) */}
            <div className="mb-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-white-600 mt-4 text-center">
            Don't have an account? <a href="/create-account" className="text-blue-600 hover:underline">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;