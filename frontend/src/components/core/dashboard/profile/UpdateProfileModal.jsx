import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../../app/slice/authSlice";
import { toast } from "react-toastify";
import { updateProfilePic } from "../../../../services/opreation/authAPI";
import { setProfile } from "../../../../app/slice/profileSlice";

const UpdateProfilePicModal = ({ onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setProfilePic(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!profilePic) {
      alert("No image selected.");
      return;
    }

    dispatch(setLoading(true));
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      const response = await updateProfilePic(formData, token);

      if (!response || !response.data || !response.data.profilePic) {
        throw new Error("No profilePic returned");
      }
      
      dispatch(
        setUser({
          ...user,
          profile: {
            ...user.profile,
            image: response.data.profilePic,
          },
        })
      );

      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture.");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-richblack-300 rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Profile Picture</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {previewURL && (
            <div className="flex justify-center">
              <img
                src={previewURL}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicModal;
