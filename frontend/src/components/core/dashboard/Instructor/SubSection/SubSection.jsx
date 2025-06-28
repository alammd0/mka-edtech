import React, { useState, useEffect } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import { createSubSection } from "../../../../../services/opreation/courseAPI";
import { useSelector } from "react-redux";

const SubSection = ({ sectionId, onClose, onSubSectionAdd }) => {
  const [subSectionData, setSubSectionData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    setSubSectionData({
      ...subSectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    e.target.value = null;
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setSubSectionData((prev) => ({ ...prev, video: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("title", subSectionData.title);
    formData.append("description", subSectionData.description);
    formData.append("video", subSectionData.video);

    // 👇 Add this to debug
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const toastId = toast.loading("Please wait...");

    try {
      const response = await createSubSection(formData, token);
      if (!response) throw new Error("Error while creating subsection");
      console.log(response.data.subSection);
      onSubSectionAdd(sectionId, response.data);
      onClose();
      toast.success("Course Created");
      toast.dismiss();
    } catch (err) {
      console.log(err);
      toast.error("Subsection creation failed");
      toast.dismiss();
    }
  };

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  return (
    <div className="scroll-auto inset-0 flex items-center justify-center bg-opacity-60 z-50">
      <div className="bg-richblack-800 p-6 rounded-xl text-white w-full max-w-2xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Create Subsection</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={subSectionData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="px-4 py-2 rounded-md bg-richblack-700"
          />

          <textarea
            name="description"
            value={subSectionData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            rows={3}
            className="px-4 py-2 rounded-md bg-richblack-700"
          />

          <label className="text-sm font-medium">
            Upload Video <span className="text-pink-500">*</span>
          </label>

          <label
            htmlFor="videoUpload"
            className="border border-dashed border-richblack-600 bg-richblack-700 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400"
          >
            <BsCloudUpload className="text-2xl mb-2" />
            <p>
              Drag and drop a video, or{" "}
              <span className="text-yellow-400 underline">Browse</span>
            </p>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </label>

          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-2 w-full rounded border border-richblack-600"
            />
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="text-red-400">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded"
            >
              Save Subsection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSection;
