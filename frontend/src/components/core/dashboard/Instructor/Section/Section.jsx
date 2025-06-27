import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

import {
  createSection,
  deleteSection,
} from "../../../../../services/opreation/courseAPI";

import { useDispatch, useSelector } from "react-redux";
import {
  setSection,
  setSectionId,
} from "../../../../../app/slice/sectionSlice";
import UpdateSection from "./UpdateSection";
import SubSection from "../SubSection/SubSection";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const courseId = useSelector((state) => state.course.courseId);
  const token = useSelector((state) => state.auth.token);


  const[subSectionModal, setSubSectionModal] = useState(false);

  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openEditModal = (sectionId, sectionName) => {
    setEditModalOpen(true);
    setEditSectionId(sectionId);
    setEditSectionName(sectionName);
  };


  const closeEditModal = (updatedSection) => {
    setEditModalOpen(false);
    setEditSectionId(null);
    setEditSectionName("");

    if (updatedSection) {
      setSections((prev) =>
        prev.map((sec) =>
          sec._id === updatedSection._id ? updatedSection : sec
        )
      );
    }
  };


  const OpenSubSectionModal = () => {
    setSubSectionModal(true);
  }

  const CloseSubSectionModal = () => {
    setSubSectionModal(false);
  }



  // Create a new section
  const createSectionHandlers = async (e) => {
    e.preventDefault();
    if (!sectionName.trim()) return;

    const toastId = toast.loading("Please wait...");

    try {
      const data = { sectionName, courseId };
      const response = await createSection(data, token);

      if (!response || !response.data) {
        throw new Error("Failed to create section");
      }

      // Append new section to list
      setSections(response.data.section);

      // Update Redux
      dispatch(setSection(response.data.section));
      //   dispatch(setSectionId(response.data.section._id));

      toast.success("Section created successfully", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      toast.dismiss(toastId);
      setSectionName("");
    }
  };

  // Delete a section
  const handleDelete = async (sectionId) => {
    const toastId = toast.loading("Please wait...");
    // console.log("Section Id in - ", sectionId);
    try {
      //   const data = sectionId ;
      const response = await deleteSection(sectionId, token);

      if (!response) {
        throw new Error("Error while deleting section");
      }

      // Remove from local state
      setSections((prev) =>
        prev.filter((section) => section._id !== sectionId)
      );

      toast.success("Section deleted successfully", { id: toastId });
      toast.dismiss(toastId);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete section", { id: toastId });
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[55%]">
      <h2 className="text-lg font-semibold font-inter text-richblack-300">
        Stage 02: Course Builder
      </h2>

      <div className="bg-richblack-800 py-6 px-8 rounded-2xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-inter font-bold text-white">
            Course Builder
          </h2>
        </div>

        {/* Form to create section */}
        <form onSubmit={createSectionHandlers}>
          <input
            type="text"
            id="sectionName"
            value={sectionName}
            name="sectionName"
            placeholder="Add a section to build your course"
            onChange={(e) => setSectionName(e.target.value)}
            required
            className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />

          <button
            type="submit"
            className="flex items-center gap-2 border-2 border-yellow-50 text-yellow-50 px-4 py-2 mt-8 rounded-sm hover:bg-yellow-50 hover:text-black transition"
          >
            <IoIosAddCircleOutline size={20} />
            Create A Section
          </button>
        </form>

        {/* Display list of sections */}
        <div className="mt-6 flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section._id}>
              <div className="flex items-center justify-between bg-richblack-700 px-4 py-3 rounded-lg text-white">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span>📘</span>
                  <span>{section.sectionName}</span>
                </div>
                <div className="flex items-center gap-4 text-richblack-300">
                  <button
                    className="hover:text-yellow-400"
                    onClick={() =>
                      openEditModal(section._id, section.sectionName)
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(section._id)}
                    className="hover:text-red-400"
                  >
                    <FaTrashAlt />
                  </button>
                  <div className="border-l h-5 border-richblack-600" />
                  <IoIosArrowDown className="cursor-pointer" />
                </div>
              </div>

              {/* Add lecture button */}
              <div onClick={OpenSubSectionModal} className="flex items-center gap-2 text-yellow-50 px-4 py-2 mt-2 rounded-sm hover:bg-yellow-50 hover:text-black transition w-fit">
                <IoMdAdd />
                Add Lecture
              </div>
            </div>
          ))}

          {/* Show Next button if sections exist */}
          {sections.length > 0 && (
            <div className="text-right mt-6">
              <button className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition">
                Next
              </button>
            </div>
          )}
        </div>

        {/* edit modal */}

        {editModalOpen && (
          <UpdateSection
            sectionId={editSectionId}
            sectionName={editSectionName}
            onClose={closeEditModal}
          />
        )}

        {/* Subsection modal */}
        {
            subSectionModal && (
                <SubSection></SubSection>
            )
        }
      </div>
    </div>
  );
};

export default Section;
