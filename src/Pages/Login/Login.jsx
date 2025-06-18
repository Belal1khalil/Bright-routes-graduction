import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [accoutExistError, setaccoutExistError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  async function SendDataToLogIn(values) {
    let toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Account/login",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in successfully");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccoutExistError(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const validationSchema = object({
    Email: string().required("Email is required").email("Email is invalid"),
    Password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema,
    onSubmit: SendDataToLogIn,
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        className="w-full max-w-md mx-auto space-y-5 shadow-xl border border-gray-100 rounded-2xl p-8 bg-white transition-all duration-300 hover:shadow-2xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-500 mb-2">
            <i className="fa-regular fa-user mr-2"></i> Log In
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome back! Enter your credentials to continue
          </p>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="Email"
            placeholder="your@email.com"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.Email && formik.touched.Email && (
            <p className="text-sm text-red-500 font-medium">
              * {formik.errors.Email}
            </p>
          )}
          {accoutExistError && (
            <p className="text-sm text-red-500 font-medium">
              * {accoutExistError}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="Password"
            placeholder="••••••••"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 cursor-pointer hover:text-primary-500 transition"
          >
            {showPassword ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </span>
          {formik.errors.Password && formik.touched.Password && (
            <p className="text-sm text-red-500 font-medium">
              * {formik.errors.Password}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgetpassword"
            className="text-primary-500 text-sm font-medium hover:text-primary-700 transition"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-primary-500 hover:bg-primary-600 text-white uppercase py-3 rounded-lg font-semibold transition-colors duration-300 mt-2"
        >
          Log In
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary-500 font-medium hover:text-primary-700"
          >
            Sign up now
          </Link>
        </div>
      </form>
    </div>
  );
}
