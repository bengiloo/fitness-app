import { CheckCircle2 } from "lucide-react";
// Import an image about how the app works
import workoutImg from "../assets/phoneapp.png";
import { checklistItems } from "../constants";

const HowItWorks = () => {
  return (
    // heading + Paragraph
    <div className="mt-20">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
            How It Works
        </h2>
        <p className="mt-6 text-lg text-center text-neutral-500">
            MyPersonalTrainer tailors your fitness journey with personalized workouts,
            nutrition plans, and progress tracking.<br /> Ready to experience it?
        </p>
        {/* Image */}
        <div className="flex flex-wrap justify-center">
            <div className="mt-14 p-2 w-full lg:w-1/2">
                <img src={workoutImg} alt="image" />
            </div>
            <div className="pt-12 w-full lg:w-1/2">
                {checklistItems.map((item, index) => (
                    <div key={index} className="flex mb-12">
                        <div className="text-white-400 mx-6 bg-blue-900 h-10 w-10 p-2 justify-center 
                        items-center rounded-full">
                            <CheckCircle2 />
                        </div>
                        <div>
                            <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                            <p className="text-md text-neutral-500">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HowItWorks