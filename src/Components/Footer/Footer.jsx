import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

// Use an existing image from the assets folder
import logoImg from "../../assets/img/6459977.png";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto pt-16 pb-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & About */}
          <div>
            <div
              className="flex items-center mb-6 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src={logoImg}
                alt="Bright Routes Logo"
                className="h-10 mr-3"
              />
              <h1 className="text-2xl font-bold text-white">
                Bright<span className="text-primary-400">Routes</span>
              </h1>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering learners worldwide with high-quality online education.
              Discover courses taught by industry experts and transform your
              career today.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                target="_blank"
                href="https://www.facebook.com"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
              >
                <i className="fa-brands fa-facebook-f text-white"></i>
              </a>
              <a
                target="_blank"
                href="https://www.x.com"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
              >
                <i className="fa-brands fa-twitter text-white"></i>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
              >
                <i className="fa-brands fa-instagram text-white"></i>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
              >
                <i className="fa-brands fa-linkedin-in text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-bold mb-6 text-white relative pl-3 border-l-4 border-primary-500">
              Quick Links
            </h5>
            <ul className="space-y-3">
              <li className="group">
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Home
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  About Us
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Courses
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/instructors"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Instructors
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Learner Resources */}
          <div>
            <h5 className="text-lg font-bold mb-6 text-white relative pl-3 border-l-4 border-primary-500">
              For Learners
            </h5>
            <ul className="space-y-3">
              <li className="group">
                <Link
                  to="/my-courses"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  My Courses
                </Link>
              </li>
              {/* <li className="group">
                <Link
                  to="/user-profile"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Profile
                </Link>
              </li> */}
              <li className="group">
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Shopping Cart
                </Link>
              </li>
              {/* <li className="group">
                <Link
                  to="/checkout"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Checkout
                </Link>
              </li> */}
              {/* <li className="group">
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Login
                </Link>
              </li> */}
              {/* <li className="group">
                <Link
                  to="/sign-up"
                  className="text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                >
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                  Sign Up
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-lg font-bold mb-6 text-white relative pl-3 border-l-4 border-primary-500">
              Contact Information
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-location-dot text-primary-400"></i>
                </div>
                <span className="text-gray-400">Cairo, Egypt</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-phone text-primary-400"></i>
                </div>
                <span className="text-gray-400">+20 (100) 100-1000</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-envelope text-primary-400"></i>
                </div>
                <span className="text-gray-400">support@brightroutes.com</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-clock text-primary-400"></i>
                </div>
                <span className="text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-4 mt-8">
            <h5 className="text-lg font-bold mb-6 text-white relative pl-3 border-l-4 border-primary-500">
              Newsletter
            </h5>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates on new courses,
              special offers, and more.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-md"
            >
              <div className="flex flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow py-3 px-4 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 transition-colors px-4 rounded-r-md text-white"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="consent" className="mr-2" />
                <label htmlFor="consent" className="text-xs text-gray-400">
                  I agree to receive email updates from Bright Routes
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Bright Routes Learning Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
