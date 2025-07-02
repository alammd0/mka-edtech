import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import * as VscIcons from "react-icons/vsc";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { userLogout } from "../../../app/slice/authSlice";

export const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function openModal() {
    setLogoutModal(true);
  }

  function closeModal() {
    setLogoutModal(false);
  }

  // find account types
  const filteredLink = sidebarLinks.filter(
    (link) => !link.type || link.type === user?.accountType
  );

  // console.log(filteredLink);

  const handleLogout = async () => {
    const toastId = toast.loading("Please wait....");
    try {
      dispatch(userLogout());
      navigate("/login");
      closeModal();
      toast.success("Logout User");
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="bg-richblack-800 mt-16 px-4 py-6 h-screen w-[15%] fixed top-0 left-0 overflow-y-auto">
      <div className="flex flex-col justify-between gap-48">
        <div className="flex flex-col gap-10">
          {filteredLink.map((link) => {
            const Icon = VscIcons[link.icon];
            const isActive = location.pathname === link.path;

            return (
              <div
                className={`${
                  isActive ? "bg-yellow-800" : ""
                } px-5 py-3 rounded-md`}
              >
                <NavLink
                  className={`flex items-center text-richblack-300 ${
                    isActive ? "text-yellow-50" : ""
                  } text-[16px] font-inter`}
                  to={link.path}
                >
                  <p> {Icon && <Icon className="mr-2 text-lg" />} </p>
                  <p> {link.name} </p>
                </NavLink>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={openModal}
            className="text-xl font-semibold font-inter bg-yellow-50 px-5 py-2 rounded-xl text-richblack-800"
          >
            Logout
          </button>
        </div>

      </div>

      {logoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" bg-richblack-800 p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-lg font-bold mb-4 text-richblack-100 font-inter text-center">Confirm Logout</h2>
            <p className="mb-4 font-inter text-center text-richblack-100">Are you sure you want to logout?</p>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
