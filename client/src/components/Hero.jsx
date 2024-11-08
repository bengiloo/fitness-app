import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        #1 Cutting Edge Health & <br />
        <span className="bg-gradient-to-r from-blue-500 to-cyan-800 text-transparent bg-clip-text">
          Fitness Solution
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Track your workouts, monitor your progress, and stay motivated<br />
        with our easy-to-use health and fitness mobile app.
      </p>
      
      {/* Updated "Get Started" Button with Link */}
      <div className="flex justify-center my-10">
        <Link to="/get-started" className="bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md text-white">
          Click To Get Started!
        </Link>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border text-blue-800 border-blue-800">
          Learn More!
        </a>
      </div>

      {/* Video samples */}
      <div className="flex mt-10 justify-center">
        <video autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4">
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4">
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;
