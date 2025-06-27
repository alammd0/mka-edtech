import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

const SubSection = () => {
    
  const [subSectionData, setSubSectionData] = useState({
    title: '',
    description: '',
    video: null,
  });

  const handleChange = (e) => {
    setSubSectionData({
      ...subSectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/") && file.size <= 12 * 1024 * 1024) {
      setSubSectionData({ ...subSectionData, video: file });
    } else {
      alert("Please select a valid video file under 12MB.");
    }
  };

  return (
    <div className="bg-richblack-800 p-6 rounded-xl text-white w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Create Subsection</h2>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          name="title"
          value={subSectionData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="px-4 py-2 rounded-md bg-richblack-700 text-white border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        
        <textarea
          name="description"
          value={subSectionData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          rows={4}
          className="px-4 py-2 rounded-md bg-richblack-700 text-white border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        
        <label className="text-sm font-medium">
          Upload Video <span className="text-pink-500">*</span>
        </label>

        <label
          htmlFor="videoUpload"
          className="border border-dashed border-richblack-600 bg-richblack-700 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer text-richblack-200 hover:border-yellow-400 transition"
        >
          <BsCloudUpload className="text-2xl mb-2" />
          <p>
            Drag and drop a video, or <span className="text-yellow-400 underline">Browse</span>
          </p>
          <p className="text-xs mt-1">Max 12MB • Aspect Ratio 16:9 • 1024×576</p>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>

        {subSectionData.video && (
          <div className="mt-2 text-sm text-green-400">
            Selected: {subSectionData.video.name}
          </div>
        )}

        <button className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-300 transition">
          Save SubSection
        </button>
      </div>
    </div>
  );
};

export default SubSection;
