import React, { useState } from "react";
import { countryCode } from "../../../data/countrycode";

const AuthForm = ({ type }) => {
  const [accountType, setAccountType] = useState("Student");

  const [infoData, setInfoData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
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

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div>
        {type === "login" ? (
          <div>
            <h3 className="text-2xl font-bold">Welcome Back</h3>
            <p>
              Build skills for today, tomorrow, and beyond. Education to
              future-proof your career.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold">
              Join the millions learning to code with StudyNotion for free
            </h3>
            <p>
              Build skills for today, tomorrow, and beyond. Education to
              future-proof your career.
            </p>
          </div>
        )}
      </div>

      {/* Account Type Buttons */}
      {type === "signup" && (
        <div className="flex gap-4">
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
      <form className="space-y-4">
        {type === "signup" && (
          <div className="flex gap-4">
            <div className="flex-1">
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

            <div className="flex-1">
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
        <div>
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

        {/* Phone Number */}
        {type === "signup" && (
          <div>
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={infoData.countryCode}
                onChange={handleChange}
                className="bg-slate-800 w-[30%] text-white px-3 py-2 rounded-md border border-slate-600"
              >
                {countryCode.map((code, index) => (
                  <option key={index} value={code.code}>
                    {code.code} - {code.country}
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                value={infoData.phone}
                onChange={handleChange}
                required
                className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div>
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={infoData.password}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
          />
        </div>

        {/* Confirm Password */}
        {type === "signup" && (
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              id="confirmPassword"
              name="confirmPassword"
              value={infoData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;