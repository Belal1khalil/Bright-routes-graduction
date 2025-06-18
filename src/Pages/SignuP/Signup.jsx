/* eslint-disable react/jsx-no-duplicate-props */
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { object, ref, string } from "yup";
import PhoneInput from "../../Components/PhoneInput";

export default function Signup() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const [accoutExistError, setaccoutExistError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function SendDataToRegister(values) {
    let toastId = toast.loading("Creating user.......");
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Account/register",
        method: "POST",
        data: values,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Please, Check Your Email");
        setTimeout(() => {
          navigate(
            `/authemail?email=${data.user.email}&displayName=${data.user.displayName}`
          );
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setaccoutExistError(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const validationSchema = object({
    FirstName: string()
      .required("FirstName is required")
      .min(3, "Name must be at least 3 char")
      .max(25, "Name can not be more than 25 char"),
    LastName: string()
      .required("LastName is required")
      .min(3, "Name must be at least 3 char")
      .max(25, "Name can not be more than 25 char"),
    Email: string().required("Email is required").email("Email is invalid"),
    Password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    ConfirmPassword: string()
      .required("Confirm password is required")
      .oneOf([ref("Password")]),
    Mobile: string()
      .required("Phone is required")
      .matches(phoneRegex, "Sorry, We Accept Egyptian Phone Numbers Only"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      FirstName: "",
      LastName: "",
      Mobile: "",
      Image: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      await SendDataToRegister(formData);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-8">
      <form
        className="w-full max-w-md mx-auto space-y-5 shadow-xl border border-gray-100 rounded-2xl p-8 bg-white transition-all duration-300 hover:shadow-2xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-500 mb-2">
            <i className="fa-regular fa-user mr-2"></i> Register Now
          </h2>
          <p className="text-gray-500 text-sm">
            Create your account to get started
          </p>
        </div>

        {/* First Name Field */}
        <div className="space-y-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="FirstName"
          />
          {formik.errors.FirstName && formik.touched.FirstName && (
            <p className="text-sm text-red-500 font-medium">
              * {formik.errors.FirstName}
            </p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="space-y-1">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="LastName"
          />
          {formik.errors.LastName && formik.touched.LastName && (
            <p className="text-sm text-red-500 font-medium">
              * {formik.errors.LastName}
            </p>
          )}
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
            placeholder="your@email.com"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="Email"
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
            placeholder="••••••••"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="Password"
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

        {/* Confirm Password Field */}
        <div className="space-y-1 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            value={formik.values.ConfirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="ConfirmPassword"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 cursor-pointer hover:text-primary-500 transition"
          >
            {showConfirmPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
          {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword && (
            <p className="text-sm text-red-500 font-medium">
              * {formik.errors.ConfirmPassword}
            </p>
          )}
        </div>

        {/* Mobile Field */}
        <PhoneInput
          value={formik.values.Mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="Mobile"
          id="signup-mobile"
          label="Phone Number"
          required={true}
          error={formik.touched.Mobile && formik.errors.Mobile}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-primary-500 hover:bg-primary-600 text-white uppercase py-3 rounded-lg font-semibold transition-colors duration-300 mt-4"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-500 font-medium hover:text-primary-700"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
