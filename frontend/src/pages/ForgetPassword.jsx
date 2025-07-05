import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "../services/opreation/authAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slice/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    try {
      const data = {
        email: formData.email.trim(),
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      };

      const response = await forgetPassword(data);

      if (!response) {
        toast.error(response.data.message);
        return;
      }

      dispatch(setUser(response));
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log("Error message -", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="mt-50 w-9/12 mx-auto text-white flex justify-center items-center">
      <div className="md:w-[50%] space-y-4">
        <h1 className="text-2xl font-bold font-inter capitalize text-center">
          Forget Your Password
        </h1>
        <form
          onSubmit={updatePassword}
          className="space-y-3 text-richblack-300"
        >
          <div className="flex gap-1 flex-col w-full font-inter">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Account email address"
              value={formData.email}
              name="email"
              required
              onChange={handleChange}
              id="email"
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
            />
          </div>

          <div className="relative flex gap-1 flex-col w-full font-inter">
            <label htmlFor="newPassword">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.newPassword}
              name="newPassword"
              required
              onChange={handleChange}
              id="newPassword"
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] cursor-pointer text-white"
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <div className="relative flex gap-1 flex-col w-full font-inter">
            <label htmlFor="confirmNewPassword">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter confirm new Password"
              value={formData.confirmNewPassword}
              name="confirmNewPassword"
              required
              onChange={handleChange}
              id="confirmNewPassword"
              className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] cursor-pointer text-white"
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <Link to="/login" className="text-blue-400 font-inter text-[16px]">
              Back to Login
            </Link>
            <button
              type="submit"
              className="bg-yellow-50 hover:bg-yellow-400 text-white py-2 px-6 rounded-md text-xl font-inter"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
