import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SubSection from "../SubSection/SubSection";
import {
  createSection,
  deleteSection,
  deleteSubsection,
} from "../../../../../services/opreation/courseAPI";
import { setSection } from "../../../../../app/slice/sectionSlice";
import UpdateSection from "./UpdateSection";
import { Link } from "react-router-dom";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState([]);
  const [subSectionModal, setSubSectionModal] = useState(false);
  const [secId, setSecId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const courseId = useSelector((state) => state.course.courseId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const createSectionHandlers = async (e) => {
    e.preventDefault();
    if (!sectionName.trim()) return;
    const toastId = toast.loading("Please wait...");

    try {
      const response = await createSection({ sectionName, courseId }, token);
      if (!response || !response.data)
        throw new Error("Failed to create section");
      setSections(response.data.section);
      dispatch(setSection(response.data.section));
      toast.success("Section created successfully");
      toast.dismiss(toastId);
      setSectionName("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      toast.dismiss(toastId);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleAddSubSection = (sectionId, updatedSection) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section._id === sectionId ? updatedSection : section
      )
    );
  };

  const handleDelete = async (sectionId) => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await deleteSection(sectionId, token);
      if (!response) throw new Error("Delete failed");
      setSections((prev) => prev.filter((sec) => sec._id !== sectionId));
      toast.success("Deleted", { id: toastId });
    } catch (err) {
      toast.error("Error deleting", { id: toastId });
    }
  };

  const handleSubSectionDelete = async (subSectionId, sectionId) => {
    const toastId = toast.loading("Please Wait...");
    try {
      const data = { subSectionId, sectionId };
      const response = await deleteSubsection(data, token);

      if (!response) {
        throw new Error();
      }

      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                subSection: section.subSection.filter(
                  (item) => item._id !== subSectionId
                ),
              }
            : section
        )
      );

      toast.success("Subsection deleted...");
      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error("Sub section deleting error");
      toast.dismiss(toastId);
    }
  };

  const openEditModal = (id, name) => {
    setEditSectionId(id);
    setEditSectionName(name);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditSectionId(null);
    setEditSectionName("");
  };

  const openSubSectionModal = (id) => {
    setSecId(id);
    setSubSectionModal(true);
  };

  const closeSubSectionModal = () => {
    setSubSectionModal(false);
    setSecId(null);
  };

  return (
    <div className="flex flex-col gap-4 w-[55%]">
      <h2 className="text-lg font-semibold">Stage 02: Course Builder</h2>

      <form
        onSubmit={createSectionHandlers}
        className="bg-richblack-800 p-6 rounded-xl"
      >
        <input
          type="text"
          placeholder="Add section"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="w-full px-4 py-2 bg-richblack-700 text-white rounded-lg"
        />
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded"
        >
          <IoIosAddCircleOutline /> Create Section
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section._id}
            className="bg-richblack-700 px-4 py-3 rounded text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                📘 <span>{section.sectionName}</span>
              </div>
              <div className="flex gap-3 text-richblack-300">
                <button
                  onClick={() =>
                    openEditModal(section._id, section.sectionName)
                  }
                >
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(section._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>

            <div className="bg-richblack-700 px-4 py-3 rounded text-white">
              {section.subSection.map((subSection) => (
                <div
                  key={subSection._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-2 items-center">
                    📘 <span>{subSection.title}</span>
                  </div>
                  <div className="flex gap-3 text-richblack-300">
                    <button>
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleSubSectionDelete(subSection._id, section._id)
                      }
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => openSubSectionModal(section._id)}
              className="flex gap-2 items-center mt-2 text-yellow-400"
            >
              <IoMdAdd /> Add Lecture
            </button>
          </div>
        ))}

        {/* Show Next button if sections exist */}
        {sections.length > 0 && (
          <div className="text-right mt-6">
            <button className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition">
              <Link to="/dashboard/last-step">Next</Link>
            </button>
          </div>
        )}
      </div>

      {editModalOpen && (
        <UpdateSection
          sectionId={editSectionId}
          sectionName={editSectionName}
          onClose={closeEditModal}
        />
      )}

      {subSectionModal && (
        <SubSection
          onSubSectionAdd={handleAddSubSection}
          sectionId={secId}
          onClose={closeSubSectionModal}
        />
      )}
    </div>
  );
};

export default Section;
