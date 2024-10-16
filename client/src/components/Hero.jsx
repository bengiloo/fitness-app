import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";


const Hero = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
        {/* Website Header */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            #1 Cutting Edge Health & <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-800 text-transparent bg-clip-text">
                Fitness Solution
            </span>
        </h1>
        {/* Paragraph */}
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
            Track your workouts, monitor your progress, and stay motivated<br />
            with our easy-to-use health and fitness mobile app.
        </p>
        {/* anchor tags for Getting Started and Learning more */}
        <div className="flex justify-center my-10">
            <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md">
                Click To Get Started!
            </a>
            <a href="#" className="py-3 px-4 mx-3 rounded-md border">
                Learn More!
            </a>
        </div>
        {/* Video samples go here */}
        <div className="flex mt-10 justify-center">

            {/* Guy deadlifting */}
            <video autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4">
                <source src={video1} type="video/mp4" />
                Your browswer does not support the video tag.
            </video>
            {/* Guy running on treadmil */}
            <video autoPlay loop muted className="rounded-lg w-1/2 border border-blue-700 shadow-blue-400 mx-2 my-4">
                <source src={video2} type="video/mp4" />
                Your browswer does not support the video tag.
            </video>

        </div>
    </div>
  )
};

export default Hero
