import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../app/slice/authSlice";
import { toast } from "react-toastify";
import { getuser } from "../../../../services/opreation/authAPI";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import UpdateProfilePicModal from "./UpdateProfileModal";

const Myprofile = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // function to find user details
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  const path = useLocation();
  const [openProfileModal, setOpenProfileModal] = useState(false);

  function openProfileModalHandler() {
    setOpenProfileModal(true);
  }

  function closeProfileModalHandler() {
    setOpenProfileModal(false);
  }

  // console.log(path.pathname.trim(1, 0));

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setLoading(true));
      const toastId = toast.loading("Please Wait....");
      try {
        const response = await getuser(user._id, token);

        if (!response || !response.data) {
          throw new Error("Error inside use-effect while fetching user");
        }
        setProfileData(response.data);
        toast.success("User Profile successfully...");
        toast.dismiss(toastId);
      } catch (error) {
        console.error("Error while fetching profile details --- ", error);
        toast.error("Getting error while fetch Profile Details....");
        toast.dismiss(toastId);
      }
      dispatch(setLoading(false));
    };

    fetchProfile();
  }, [user._id, token]);

  console.log(profileData);

  return (
    <div>
      <div>
        <p
          className={`text-[16px] font-inter font-normal tracking-widest capitalize`}
        >
          {path.pathname}
        </p>
        <p className="text-richblack-5 mt-4 text-2xl font-semibold font-inter ml-2">
          My Profile
        </p>

        <div className="w-11/12 mx-auto mt-6">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between bg-richblack-800 px-12 py-7 rounded-2xl">
              <div className="flex gap-8 items-center">
                {profileData?.profile?.profilePic === null ? (
                  <div className="bg-richblack-900 h-20 w-20 flex items-center justify-center rounded-full shadow shadow-yellow-5">
                    <p className="text-3xl font-inter font-bold">
                      {profileData?.firstName?.[0] + profileData?.lastName?.[0]}
                    </p>
                  </div>
                ) : (
                  <div className="bg-richblack-900 h-20 w-20 flex items-center justify-center rounded-full shadow shadow-yellow-5">
                    <img
                      src={profileData?.profile?.profilePic}
                      alt="Not image"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <p className="text-2xl font-semibold font-inter capitalize">
                    {profileData?.firstName + " " + profileData?.lastName}
                  </p>
                  <p className="text-[16px] font-inter">{profileData?.email}</p>
                </div>
              </div>

              <button className="bg-yellow-50 h-fit px-4 py-2 text-richblack-400 rounded-md font-inter hover:bg-yellow-100 transition-all duration-100">
                <Link
                  className="flex gap-2 items-center h-fit"
                  onClick={openProfileModalHandler}
                >
                  <FaRegEdit />
                  Edit
                </Link>
              </button>
            </div>

            <div className="bg-richblack-800 px-12 py-7 rounded-2xl">
              <div className="flex justify-between">
                <p className="text-richblack-5 text-xl font-bold font-inter">
                  Personal Details
                </p>

                <button className="bg-yellow-50 h-fit px-4 py-2 text-richblack-400 rounded-md font-inter hover:bg-yellow-100 transition-all duration-100">
                  <Link
                    className="flex gap-2 items-center h-fit"
                    to="/dashboard/edit-profile-details"
                  >
                    <FaRegEdit />
                    Edit
                  </Link>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-10 flex-wrap mt-5">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xl font-semibold font-inter">
                      First Name
                    </p>
                    <p className="text-[16px] font-semibold font-inter bg-richblack-900 mt-1 px-4 py-3 text-richblack-300 rounded-md">
                      {profileData?.firstName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-semibold font-inter">
                      Last Name
                    </p>
                    <p className="text-[16px] font-semibold font-inter bg-richblack-900 mt-1 px-4 py-3 text-richblack-300 rounded-md">
                      {profileData?.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xl font-semibold font-inter">Email</p>
                    <p className="text-[16px] font-semibold font-inter bg-richblack-900 mt-1 px-4 py-3 text-richblack-300 rounded-md">
                      {profileData?.email}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xl font-semibold font-inter">
                      Phone Number
                    </p>
                    {profileData?.profile?.phone === null ? (
                      <Link
                        className="bg-yellow-100 text-richblack-600 px-3 py-1 w-fit rounded-md font-inter font-semibold"
                        to="/dashboard/edit-profile-details"
                      >
                        Please Add Phone Number
                      </Link>
                    ) : (
                      <p className="text-[16px] font-semibold font-inter bg-richblack-900 mt-1 px-4 py-3 text-richblack-300 rounded-md">
                        {profileData?.profile?.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openProfileModal && (
        <UpdateProfilePicModal
          onClose={closeProfileModalHandler}
        />
      )}
    </div>
  );
};

export default Myprofile;
