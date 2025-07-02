import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getuser,
  updateuserandprofile,
} from "../../../../services/opreation/authAPI";

import { setLoading, setUser } from "../../../../app/slice/authSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditProfileDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // function to find user details
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getuser(user._id, token);
        if (!response || !response.data) {
          throw new Error("Error inside use-effect while fetching user");
        }
        setProfileData(response.data);
      } catch (error) {
        console.error("Error while fetching profile details --- ", error);
      }
      dispatch(setLoading(false));
    };

    fetchProfile();
  }, []);

  //   console.log(profileData);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    dob: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    if (profileData) {
      setUserData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        about: profileData.profile?.about || "",
        dob: profileData.profile?.dob || "",
        gender: profileData.profile?.gender || "",
        phone: profileData.profile?.phone || "",
      });
    }
  }, [profileData]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitUpdateuserData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const toastId = toast.loading("Please wait...");

    try {
      const data = {
        userId: user._id,
        userData: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
        profileData: {
          about: userData.about,
          dob: userData.dob,
          gender: userData.gender,
          phone: userData.phone,
        },
      };

      const response = await updateuserandprofile(data, token);
      if (!response || !response.data) {
        throw new Error("No response data");
      }

      dispatch(setUser(response.data));
      toast.success("Profile updated successfully!");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Internal error. Please try again.");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-richblack-5 mt-4 text-2xl font-semibold font-inter">
        Edit Profile Information
      </h1>

      <div className="w-11/12 mx-auto">
        <form onSubmit={submitUpdateuserData}>
          <div className="bg-richblack-800 px-10 py-7 rounded-2xl flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="firstName"
                  className="mb-1 font-medium  font-inter text-richblack-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                  value={userData.firstName}
                  onChange={changeHandler}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastName"
                  className="mb-1 font-medium  font-inter text-richblack-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                  value={userData.lastName}
                  onChange={changeHandler}
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date of Birth */}
              <div className="flex flex-col">
                <label
                  htmlFor="dob"
                  className="mb-1 font-medium  font-inter text-richblack-300"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userData.dob}
                  onChange={changeHandler}
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label
                  htmlFor="gender"
                  className="mb-1 font-medium font-inter text-richblack-300"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userData.gender}
                  onChange={changeHandler}
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1 font-medium  font-inter text-richblack-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={changeHandler}
                  placeholder="Enter your phone number"
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="mb-1 font-medium  font-inter text-richblack-300"
                  htmlFor="email"
                >
                  {" "}
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={changeHandler}
                  className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
                />
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col">
              <label
                htmlFor="about"
                className="mb-1 font-medium  font-inter text-richblack-300"
              >
                About
              </label>
              <textarea
                id="about"
                name="about"
                value={userData.about}
                onChange={changeHandler}
                placeholder="Tell us about yourself"
                rows={3}
                className="bg-richblack-900 outline-none px-3 py-2 rounded-sm hover:shadow hover:shadow-richblack-800 hover:border-1 hover:border-richblack-300 transition-all duration-100"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Link to="/dashboard/my-profile">
              <button
                type="button"
                className="px-4 py-2 bg-richblack-300 rounded-xl text-richblack-800 font-inter"
              >
                Cancel and back
              </button>
            </Link>

            <button
              type="submit"
              className="px-4 py-2  bg-yellow-50 rounded-xl text-richblack-800 font-inter"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileDetails;
