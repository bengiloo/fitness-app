import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


export const navItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Testimonials", href: "#" },
];

// Consult team members to see if we wanna add this section
// Use this to access profile pictures
// import user# from "../assets/profile-pictures/nameofImage.jpg";
// export const testimonials = [
//   {
//     user: ,
//     vocation: ,
//     //image: ,
//     testimonial: ""
//   }
// ];

// App Features
export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Personalized Workout Plans",
    description:
      "Tailored fitness routines to meet your unique goals",
  },
  {
    icon: <Fingerprint />,
    text: "Goal Setting",
    description:
    "Set health targets, we'll help you reach them",
  },
  {
    icon: <ShieldHalf />,
    text: "Educational Content",
    description:
    "Learn more about health and wellness with our curated articles",
  },
  {
    icon: <BatteryCharging />,
    text: "Progress Tracking",
    description:
    "Track our health easily and visualize your progress",
  },
  {
    icon: <PlugZap />,
    text: "Nutrition Tracking",
    description:
    "Monitor your diet to fuel your body right!",
  },
  {
    icon: <GlobeLock />,
    text: "Reminders and Notifications",
    description:
    "Stay on track with timely reminders and notifications",
  },
];

export const checklistItems = [
  {
    title: "Tell Us About Yourself",
    description:
      "Help us personalize your experience. Share your current and future fitness goals.",
  },
  {
    title: "Discover the Benefits",
    description:
      "Explore the unique features of MyPersonalTrainer. Learn about personalized workouts, nutrition plans and progress tracking tailored to your needs.",
  },
  {
    title: "Interactive Walkthrough",
    description:
      "Navigate the app with ease. Our interactive tour guides you through key features and functionalitites",
  },
  {
    title: "Start Your Journey",
    description:
      "Dive into your first workout, explore meal and workout plans. Welcome to MyPersonalTrainer",
  },
];
