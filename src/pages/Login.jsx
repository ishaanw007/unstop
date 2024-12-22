import React, { useState } from "react";
import illustration from "../assets/illustration.png";
import google from "../assets/googlr.png";
import facebook from "../assets/facebook.png";
import account_circle from "../assets/account_circle.png";
import visibility from "../assets/visibility.png";
import mail from "../assets/mail.png";
import key from "../assets/key.png";
// import { User, Mail, Lock, Eye } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: values.username,
        password: values.password,
      });

      // Store only the access token in localStorage
      localStorage.setItem('accessToken', response.data.accessToken); // Store access token

      alert("Login successful!");
      console.log(response.data);

      navigate('/home', { replace: true });
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .oneOf(["emilys"], "Username must be 'emilys'")
      .required("Username is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100">
          <img
            src={illustration}
            alt="Illustration"
            className="w-full max-w-[540px] h-auto object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-8 my-12 mx-4 sm:mx-36 py-10 shadow-xl rounded-xl">
          <div className="w-full h-full">
            <h1 className="text-3xl sm:text-4xl">Welcome to</h1>
            <h1 className="text-3xl sm:text-4xl font-black text-purple-600 mb-8">Unstop</h1>

            {/* Social Login Buttons */}
            <button className="flex gap-3 h-16 sm:h-20 text-base font-medium items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-600 bg-white hover:bg-gray-50 mb-4">
              <img src={google} alt="Google" />
              Login with Google
            </button>
            <button className="flex gap-3 h-16 sm:h-20 font-medium items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-600 bg-white hover:bg-gray-50 mb-4">
              <img src={facebook} alt="Facebook" />
              Login with Facebook
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login Form */}
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, values }) => (
                <Form className="space-y-6">
                  {/* Username */}
                  <div>
                    <div className="relative">
                      <label htmlFor="username" className="absolute pl-16 pb-2 top-2 flex items-center pointer-events-none text-xs text-gray-700 font-light">
                        Username
                      </label>
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <img src={account_circle} alt="Username" />
                      </div>
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`block w-full pl-16 pr-4 h-20 rounded-xl bg-gray-100 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-[18px] font-bold leading-[24px] text-left`}
                      />
                    </div>
                    <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />

                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <label htmlFor="email" className="absolute pl-16 pb-2 top-2 flex items-center pointer-events-none text-xs text-gray-700 font-light">
                        Email
                      </label>
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <img src={mail} alt="Email" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`block w-full pl-16 pr-4 h-20 rounded-xl bg-gray-100 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-[18px] font-bold leading-[24px] text-left`}
                      />
                    </div>
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />

                  </div>

                  {/* Password */}
                  <div>
                    <div className="relative">
                      <label htmlFor="password" className="absolute pl-16 pb-2 top-2 flex items-center pointer-events-none text-xs text-gray-700 font-light">
                        Password
                      </label>
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <img src={key} alt="Password" />
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`block w-full pl-16 pr-4 h-20 rounded-xl bg-gray-100 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-[18px] font-bold leading-[24px] text-left`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center"
                      >
                        <img src={visibility} alt="Toggle Password Visibility" />
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />

                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 text-purple-600 rounded bg-gray-300 border-0"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-purple-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-4 px-4 rounded-xl hover:bg-purple-700 transition-colors text-lg font-medium"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;