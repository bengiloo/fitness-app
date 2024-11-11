import logo from "../assets/logo.png";
import { navItems } from "../constants";
import {Menu, X} from "lucide-react";
import {useState} from "react";

export const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    // Navbar
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg 
    border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                {/* Website logo */}
                <div className="flex items-center flex-shrink-0">
                    <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                    <span className="text-xl tracking-tight">MyPersonalTrainer</span>
                </div>
                {/* Navbar links */}
                <ul className="hidden lg:flex ml-14 space-x-12">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                {/* Sign-up and Create Account buttons */}
                <div className="hidden lg:flex justify-center space-x-12 items-center">
                    <a href="/login" className="py-2 px-3 border rounded-md">
                        Login
                    </a>
                    <a href="/create-account" className="bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md">
                        Create Account
                    </a>
                </div>
                {/* Button that switches on click between menu bars or displays
                    the "X" icon when toggled works when page is condensed to mobile
                */}
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}>
                        {mobileDrawerOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {/* If the mobile drawer is open, the navbar links are displayed as a stack */}
            {mobileDrawerOpen && (
                <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col 
                justify-center items-center lg:hidden">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className="py-4">
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    {/* Following this conditional, we populate the sign-in and create acct butns as well */}
                    <div className="flex space-x-6">
                        <a href="/login" className="py-2 px-3 border rounded-md">
                            Login
                        </a>
                        <a href="/create-account" className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-800">
                            Create Account
                        </a>
                    </div>
                </div>
            )}
        </div>
    </nav>

  )
}

export default Navbar;