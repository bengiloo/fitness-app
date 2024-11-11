import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import CreateAccount from './CreateAccount';
import GetStartedForm from './GetStartedForm';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div className="bg-gradient-to-br from-[#01030f] to-[#001f3f] min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} /> {}
          <Route path="/get-started" element={<GetStartedForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
