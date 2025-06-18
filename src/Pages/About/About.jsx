import { Helmet } from "react-helmet";
import AboutSection from "./AboutSection";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Bright-Routes Learning Platform</title>
        <meta
          name="description"
          content="Learn about Bright-Routes, our mission, vision, and commitment to providing high-quality online education."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Empowering learners worldwide with accessible, quality education
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <i className="fa-solid fa-bullseye text-2xl text-primary-500"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission at Bright-Routes is to provide accessible,
                affordable, and high-quality education to learners worldwide. We
                believe in breaking down barriers to education and empowering
                individuals to reach their full potential through continuous
                learning and skill development.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <i className="fa-solid fa-eye text-2xl text-primary-500"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where quality education is a right, not a
                privilege. Bright-Routes aims to be the leading platform for
                online learning, connecting passionate instructors with eager
                students and creating a global community of lifelong learners
                ready to tackle the challenges of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Bright-Routes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-lightbulb text-blue-500"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We constantly evolve our platform and courses to stay ahead of
                industry trends.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-handshake text-green-500"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">
                We maintain the highest ethical standards in all our
                interactions and content.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-globe text-purple-500"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                We design our platform to be accessible to everyone, regardless
                of background or location.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-chart-line text-orange-500"></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We are committed to delivering the highest quality educational
                experience possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Team Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Team</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We are always looking for talented individuals who share our passion
            for education and innovation.
          </p>
        </div>
      </div>
    </>
  );
}
