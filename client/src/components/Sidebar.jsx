import logo from "../assets/logo.png";
import { Menu, X, CircleUserRound } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="relative"> {/* Ensuring the parent div is relative for z-index stacking */}
      {/* Overlay - darkens the background when sidebar is open */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          mobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setMobileDrawerOpen(false)} // Close sidebar if clicked outside
      />

      {/* Sidebar - Fixed on the left side of the screen */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-200 transform transition-transform
          duration-300 ease-in-out shadow-xl shadow-white z-50 ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`} // Sliding effect
      >
        <div className="p-4">
          <div className="flex flex-row items-center space-x-4 w-full justify-between">
            <img className="h-16 w-16 text-black" src={logo} alt="logo" />
            <button
              className="rounded-lg px-3 py-2 ml-10 hover:text-gray-700 hover:bg-blue-800"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} // Toggle sidebar on click
            >
              {mobileDrawerOpen ? <X className="text-white"/> : <div></div>}
            </button>
          </div>
          <p className="text-lg text-blue-500">Here is where your sidebar content goes.</p>
          <ul>
            <li className="text-lg text-blue-500 hover:bg-white">
              <a href="/home">Home</a>
            </li>
            <li className="text-lg text-blue-500 hover:bg-white">
              <a href="/my-plan">My Plan</a>
            </li>
            <li className="text-lg text-blue-500 hover:bg-white">
              <a href="/exercises">Exercises</a>
            </li>
            <li className="text-lg text-blue-500 hover:bg-white">
              {/* You can leave this empty if it's a placeholder */}
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-10 z-30 py-3 backdrop-blur-lg border-b border-white">
        <div className="flex container z-30 mx-auto text-sm">
          <div className="flex justify-start z-30 items-center w-full">
            <button
              className="border-2 border-solid border-white rounded-lg px-3 py-2 flex items-center justify-center"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} // Toggle sidebar on click
            >
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
            <img className="h-16 w-16 ml-3" src={logo} alt="logo" />
            <button className="h-12 w-12 ml-auto">
              <CircleUserRound className="h-full w-full ml-auto" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
