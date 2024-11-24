import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";

const LandingPage = () => {
  localStorage.clear();
  return (
    <div className="bg-gradient-to-br from-[#01030f] to-[#001f3f] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Hero />
        <Features />
        <HowItWorks />
      </div>
    </div>
  )
}

export default LandingPage