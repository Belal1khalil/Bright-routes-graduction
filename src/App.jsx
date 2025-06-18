import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Context/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import CartProvider from "./Context/Cart.Context";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import Layout from "./Components/LayOut/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignuP/Signup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import AuthEmail from "./Pages/Auth/AuthEmail";
import Courses from "./Pages/Courses/Courses";
import ShoppingCart from "./Pages/Cart/Cart";
import CourseDetails from "./Pages/CourseDetails/CourseDetails";
import InstructorsPage from "./Pages/instructors/instructors";
import VideoPlayer from "./Components/courseVideo/CourseVideo";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Forgetpassword from "./Pages/forgetPass/forgetPassword";
import ConfirmEmail from "./Pages/ConfirmEmail/ConfirmEmail";
import Confirmforgetpass from "./Pages/confirmforgetpass/confirmforgetpass";
import ResetPassword from "./Pages/Reset/ResetPassword";
import Paymentsuccess from "./Pages/paymenytSuccess/Paymentsuccess1";
import Paymentfailed from "./Pages/PaymentFailed/Paymentfailed";
import MyCourses from "./Pages/MyCourses/MyCourses";
import UserProfile from "./Pages/UserProfile/UserProfile";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import FeedbackExample from "./Pages/FeedbackExample/FeedbackExample";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Quiz from "./Pages/Quiz/Quiz";
import StaticQuiz from "./Components/StaticQuiz/StaticQuiz";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/Courses", element: <Courses /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <ShoppingCart /> },
        { path: "/course/:id", element: <CourseDetails /> },
        { path: "/instructors", element: <InstructorsPage /> },
        { path: "/video", element: <VideoPlayer /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/payment-success", element: <Paymentsuccess /> },
        { path: "/payment-failure", element: <Paymentfailed /> },
        { path: "/my-courses", element: <MyCourses /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "/feedback-example", element: <FeedbackExample /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/quiz", element: <Quiz /> },
        { path: "/static-quiz", element: <StaticQuiz /> },
      ],
    },

    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/authemail", element: <AuthEmail /> },
        { path: "/confirmEmail", element: <ConfirmEmail /> },
        { path: "/forgetpassword", element: <Forgetpassword /> },
        { path: "/Confirmforgetpass", element: <Confirmforgetpass /> },
        { path: "/ResetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </UserProvider>
        <Toaster position="top-right" />
      </QueryClientProvider>
      {/* <Offline>
        <div className="p-4 fixed right-8 bottom-8 z-50 rounded-lg shadow bg-gray-200 text-gray-600 font-semibold">
          <i className="fa-solid fa-wifi"></i>
          <span> Check Your Internet Connection</span>
        </div>
      </Offline> */}
    </ThemeProvider>
  );
}
