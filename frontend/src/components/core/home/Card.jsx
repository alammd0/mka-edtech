import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore"; 

const ExploreSection = () => {
  const [activeTab, setActiveTab] = useState(HomePageExplore[0].tag); 

  const activeCourses =
    HomePageExplore.find((section) => section.tag === activeTab)?.courses || [];

  return (
    <div className="p-6 grid gap-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 bg-richblack-700 px-4 py-2 rounded-2xl">
        {HomePageExplore.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 font-inter ${
              activeTab === section.tag
                ? "bg-richblack-800 text-white px-4 py-2"
                : ""
            }`}
            onClick={() => setActiveTab(section.tag)}
          >
            {section.tag}
          </button>
        ))}
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCourses.map((course, i) => (
          <div
            key={i}
            className="bg-richblack-100 p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg font-inter"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {course.heading}
            </h3>
            <p className="text-gray-600 text-[16px] mb-2">
              {course.description}
            </p>
            <p className="text-sm text-gray-500">Level: {course.level}</p>
            <p className="text-sm text-gray-500">
              Lessons: {course.lessionNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
