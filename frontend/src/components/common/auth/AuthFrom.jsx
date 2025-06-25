import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, signup } from "../../../services/opreation/authAPI";
import { setToken, setUser } from "../../../app/slice/authSlice";

const AuthForm = ({ type }) => {
  const [accountType, setAccountType] = useState("Student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [infoData, setInfoData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update account type in state as well
  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setInfoData((prev) => ({
      ...prev,
      accountType: type,
    }));
  };

  const submitHandlersData = async (e) => {
    e.preventDefault();
    // console.log("Info Data - ", infoData);
    if (type === "signup") {
      const toastId = toast.loading("Please wait...");
      try {
        const response = await signup(infoData);
        // console.log(response);

        console.log("Singup Data - ", response);

         if (!response) {
          throw new Error("Not response..");
        }
        dispatch(setUser(response.data));
        toast.success("User singup Success");
        navigate("/login");
      } catch (err) {
        toast.error("Signup Failed");
      }
      toast.dismiss(toastId);
    } else {
      const toastId = toast.loading("Please wait...");
      try {
        const response = await login(infoData);
        console.log("response - ", response);
        if (!response) {
          throw new Error("Not response..");
        }
        dispatch(setUser(response.data));
        dispatch(setToken(response.token));
        toast.success("User Login Success");
        navigate("/");
      } catch (err) {
        toast.error("Login Failed");
      }
      toast.dismiss(toastId);
    }
  };
  
  console.log("Error" , infoData);

  return (
    <div className="md:w-[50%] text-white space-y-4">
      <div>
        {type === "login" ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold font-inter capitalize">
              Welcome Back
            </h3>
            <p className="font-[16px] font-inter text-richblack-300">
              Build skills for today, tomorrow, and beyond.{" "}
              <i className="text-blue-600">
                Education to future-proof your career.
              </i>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold font-inter capitalize">
              Join the millions learning to code with Edtech for free
            </h3>
            <p className="font-[16px] font-inter text-richblack-300">
              Build skills for today, tomorrow, and beyond.{" "}
              <i className="text-blue-600">
                Education to future-proof your career.
              </i>
            </p>
          </div>
        )}
      </div>

      {/* Account Type Buttons */}
      {type === "signup" && (
        <div className="flex gap-3 bg-richblack-800 w-fit px-4 py-2 rounded-2xl">
          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              accountType === "Student"
                ? "bg-slate-900 text-white"
                : "text-slate-400 border border-slate-600"
            }`}
            onClick={() => handleAccountTypeChange("Student")}
          >
            Student
          </button>

          <button
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              accountType === "Instructor"
                ? "bg-slate-900 text-white"
                : "text-slate-400 border border-slate-600"
            }`}
            onClick={() => handleAccountTypeChange("Instructor")}
          >
            Instructor
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={submitHandlersData}
        className="space-y-3 text-richblack-300"
      >
        {type === "signup" && (
          <div className="flex gap-2 font-inter text-richblack-300">
            <div className="flex gap-1 text-richblack-300 flex-col w-full font-inter">
              <label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                id="firstName"
                name="firstName"
                value={infoData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
              />
            </div>

            <div className="flex gap-1 flex-col w-full">
              <label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                id="lastName"
                name="lastName"
                value={infoData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex gap-1 flex-col w-full font-inter">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={infoData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
          />
        </div>

        <div className="flex gap-2">
          <div
            className={`relative flex gap-1 flex-col ${
              type === "signup" ? "w-[100%]" : "w-full"
            } font-inter`}
          >
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              name="password"
              value={infoData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] cursor-pointer text-white"
            >
              {showPassword ? "👁️" : "🙈"}
            </span>

            {type === "login" && (
              <div className="text-right mt-2 text-blue-400 font-inter text-[16px]">
                <Link to="/forget-password">Forget password</Link>
              </div>
            )}
          </div>

          {/* Only render this on signup */}
          {type === "signup" && (
            <div className=" relative flex gap-1 flex-col w-full font-inter">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                id="confirmPassword"
                name="confirmPassword"
                value={infoData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
              />

              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[40px] cursor-pointer text-white"
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-yellow-50  hover:bg-yellow-400 text-white py-2 rounded-md text-xl font-inter"
          >
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </div>

        <div className="text-[16px] font-inter text-center text-yellow-500">
          {type === "login" ? (
            <Link to="/signup">Don't Have an account</Link>
          ) : (
            <Link to="/login">I have an account account</Link>
          )}
        </div>
      </form>
    </div>
  );

};

export default AuthForm;
