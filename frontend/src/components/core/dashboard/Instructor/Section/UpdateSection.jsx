import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateSection } from "../../../../../services/opreation/courseAPI";
import { setSection } from "../../../../../app/slice/sectionSlice";

const UpdateSection = ({ sectionId, sectionName, onClose }) => {
  const [updatedName, setUpdatedName] = useState(sectionName);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!updatedName.trim()) {
      toast.error("Section name cannot be empty");
      return;
    }

    const toastId = toast.loading("Updating...");
    try {
      const data = { updatedName, sectionId };
      const response = await updateSection(data, token);

    //   console.log(response);

      if (!response || !response.data) {
        throw new Error("Failed to update section");
      }

      // Update Redux (optional)
      dispatch(setSection(response.data.section));

      // Update UI via prop callback (better pattern)
      onClose(response.data); // pass back updated section

      toast.success("Section updated successfully", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update section", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-richblack-800 text-white px-8 py-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Section Name
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Enter new section name"
            className="w-full px-4 py-3 rounded-md bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-richblack-600 hover:bg-richblack-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-300 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSection;
