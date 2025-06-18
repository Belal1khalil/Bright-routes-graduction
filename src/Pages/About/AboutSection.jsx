import Aboutimg from "../../assets/img/about.jpg";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary-500 z-0"></div>
          <img
            src={Aboutimg}
            className="w-full h-auto object-cover rounded-lg shadow-xl relative z-10"
            alt="About Bright-Routes"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary-500 z-0"></div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <h3 className="text-xl text-primary-500 font-bold uppercase mb-1">
              About us
            </h3>
            <div className="h-1 w-20 bg-primary-500"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to Bright-Routes
          </h1>

          <p className="text-lg text-gray-600">
            Bright-Routes is a flexible and accessible way to acquire knowledge
            and skills, allowing learners to study anytime, anywhere. We provide
            cutting-edge courses designed to prepare you for todays competitive
            market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                <i className="fa-solid fa-user-tie text-primary-500 group-hover:text-white"></i>
              </div>
              <p className="font-medium text-gray-700 group-hover:text-primary-600 transition-all duration-300">
                Skilled Instructors
              </p>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                <i className="fa-solid fa-certificate text-primary-500 group-hover:text-white"></i>
              </div>
              <p className="font-medium text-gray-700 group-hover:text-primary-600 transition-all duration-300">
                International Certificate
              </p>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                <i className="fa-solid fa-laptop text-primary-500 group-hover:text-white"></i>
              </div>
              <p className="font-medium text-gray-700 group-hover:text-primary-600 transition-all duration-300">
                Online Classes
              </p>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-300">
                <i className="fa-solid fa-graduation-cap text-primary-500 group-hover:text-white"></i>
              </div>
              <p className="font-medium text-gray-700 group-hover:text-primary-600 transition-all duration-300">
                Lifelong Learning
              </p>
            </div>
          </div>

          <Link
            to="/about"
            className="mt-6 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 inline-block"
          >
            <span>Learn More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
