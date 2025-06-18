import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/Cart.Context";
import axios from "axios";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { token, logOut } = useContext(UserContext);
  let { CourseInfo, GetCartCourses, isLoadingCart } = useContext(CartContext);
  const userMenuRef = useRef(null);
  const [userData, setUserData] = useState(null);

  // Load cart items when the website opens, only if it hasn't been loaded yet
  useEffect(() => {
    if (token && !CourseInfo && !isLoadingCart) {
      GetCartCourses();
    }
  }, [token, GetCartCourses, CourseInfo, isLoadingCart]);

  // Fetch user data for profile image
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  async function getUserData() {
    try {
      const response = await axios.get(
        "https://brightminds.runasp.net/api/Account/UserProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar py-5 shadow-md fixed top-0 right-0 left-0 bg-white text-black z-30">
        <div className="md:px-9  flex justify-between items-center">
          {/* Logo */}
          <div className="logo mr-6 space-x-2">
            <i className="fa-solid fa-brain text-2xl ml-2  text-primary-500"></i>
            <Link to="/" className="text-2xl font-bold text-primary-500">
              Bright-Routes
            </Link>
          </div>

          {/* Navigation Links */}
          <ul
            className={`absolute  md:flex md:items-center md:gap-5 md:static top-20 right-0 left-0 bg-white md:bg-transparent flex flex-col md:flex-row items-center gap-5 p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/Courses"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/my-courses"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/instructors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Instructors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-500 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/Cart"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>

                {/* Mobile-only Profile Link */}
                <li className="md:hidden">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative flex items-center gap-2 before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:w-full font-semibold" : ""
                      }`;
                    }}
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center overflow-hidden">
                      {userData?.imageCover ? (
                        <img
                          src={userData.imageCover}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fa-solid fa-user text-xs"></i>
                      )}
                    </div>
                    My Profile
                  </NavLink>
                </li>

                {/* Mobile-only Logout */}
                <li className="md:hidden">
                  <button
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Logout Button (Visible on Mobile) */}
            {!token && (
              <>
                <li className="text-lg md:hidden">
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
                <li className="text-lg md:hidden">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 font-medium transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Cart Icon - Only for logged in users */}
            {token && (
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="cart relative md:block">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {CourseInfo && CourseInfo?.data?.items?.length > 0 ? (
                    <div className="counter absolute w-5 h-5 rounded-full bg-primary-500 flex justify-center items-center text-white text-md font-semibold top-0 right-0 translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform scale-100">
                      {CourseInfo.data.items.length}
                    </div>
                  ) : (
                    <div className="counter absolute w-5 h-5 rounded-full bg-gray-400 flex justify-center items-center text-white text-md font-semibold top-0 right-0 translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform scale-75 opacity-50">
                      0
                    </div>
                  )}
                </Link>

                {/* User Menu (Desktop) */}
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center overflow-hidden">
                      {userData?.imageCover ? (
                        <img
                          src={userData.imageCover}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fa-solid fa-user"></i>
                      )}
                    </div>
                    <i
                      className={`fa-solid fa-chevron-${
                        isUserMenuOpen ? "up" : "down"
                      } ml-1 text-xs`}
                    ></i>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fa-solid fa-user mr-2"></i>
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fa-solid fa-chart-line mr-2"></i>
                        Dashboard
                      </Link>
                      <Link
                        to="/my-courses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fa-solid fa-graduation-cap mr-2"></i>
                        My Courses
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={() => {
                          logOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <i className="fa-solid fa-sign-out-alt mr-2"></i>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Hamburger Menu - Outside token check so it's visible for all users */}
            <div
              className="md:hidden cursor-pointer text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i
                className={`fa-solid ${
                  isMenuOpen ? "fa-times" : "fa-bars"
                } mx-2`}
              ></i>
            </div>
          </div>

          {/* Auth Links (Visible on Desktop) */}
          <ul className="hidden md:flex justify-center items-center gap-4">
            {!token && (
              <>
                <li className="text-xl font-semibold">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before-w-full font-semibold" : ""
                      }`;
                    }}
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
                <li className="text-xl font-semibold">
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before-w-full font-semibold" : ""
                      }`;
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

// import { Link, NavLink } from "react-router-dom";

// export default function Navbar() {
//     return <>
//      <nav className=" navbar py-5 shadow-md fixed top-0 right-0 left-0">
//         <div className="container flex justify-between items-center ">
//             <div className="logo space-x-2">
//             <i className="fa-solid fa-book text-2xl text-primary-500"></i>
//              <a href="" className="text-2xl font-bold text-primary-500">e-LEARNING</a>
//             </div>
//            <ul className="flex   items-center gap-5">
//             <li className="text-lg">
//               <NavLink className={({isActive})=>{
//                return ` relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ? "before:w-full font-semibold":""}`
//               }}
//               to="/">
//               Home</NavLink>
//             </li>
//             <li>
//                 <NavLink className={({isActive})=>{
//                  return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-500 before:left-0 before:-bottom-1 ${isActive ?"before:w-full font-semibold" :""}`
//                 }} to="/Cart">Cart</NavLink>
//             </li>
//             <li>
//                 <NavLink className={({isActive})=>{
//                    return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${isActive ? "before-w-full font-semibold":""}`
//                 }} to="/courses">Courses</NavLink>
//             </li>
//             <li>
//                 <NavLink className={({isActive})=>{
//                    return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${isActive ? "before-w-full font-semibold":""}`
//                 }} to="/about">About</NavLink>
//             </li>
//             <li>
//                 <NavLink className={({isActive})=>{
//                    return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${isActive ? "before-w-full font-semibold":""}`
//                 }} to="/contact">Contact</NavLink>
//             </li>
//            </ul>
//            <Link to="/cart" className="cart relative">
//            <i className="fa-solid fa-cart-shopping"></i>
//            <div className="counter absolute w-5 h-5 rounded-full bg-primary-500 flex justify-center items-center text-white text-sm top-0 right-0 translate-x-1/2 -translate-y-1/2">
//            <i className="fa-solid fa-spinner fa-spin "></i>
//            </div>
//            </Link>
//            <ul className="flex justify-center items-center gap-4">
//             <li>
//                 <NavLink
//                 className={({isActive})=>{
//                     return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${isActive ? "before-w-full font-semibold":""}`
//                  }} to="/signup">Sign up</NavLink>
//             </li>
//             <li>
//                 <NavLink className={({isActive})=>{
//                    return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-300 before:left-0 before:-bottom-1 ${isActive ? "before-w-full font-semibold":""}`
//                 }} to="/login">Login</NavLink>
//             </li>
//             <li className="text-xl hover:text-red-600 transition-colors duration-300">
//             <i className="fa-solid fa-right-from-bracket"></i>
//             </li>
//            </ul>
//         </div>
//      </nav>
//     </>
// }
