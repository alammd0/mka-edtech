import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsCameraVideoFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import RatingAndReviewModal from "../modal/RatingAndReviewModal";

import { FaCheckCircle } from "react-icons/fa";

const CourseSidebar = ({ course, onVideoSelect, videoEnded, courseProgress }) => {
  const [openSections, setOpenSections] = useState(new Set());
  const [activeLectureId, setActiveLectureId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleLectureClick = (lecture) => {
    setActiveLectureId(lecture._id);
    onVideoSelect(lecture);
  };

  const isLectureCompleted = (lectureId) => {
    return courseProgress?.completedVideos?.includes(lectureId);
  };


  return (
    <div className="bg-richblack-800 text-white p-4 md:w-[250px] min-h-screen mb-[10px] overflow-y-auto font-inter">
      <h2 className="text-xl font-semibold mb-4 pt-5">{course?.title}</h2>

      {course?.section?.map((section) => (
        <div
          key={section._id}
          className="mb-4 bg-richblack-300 px-4 py-2 text-richblack-800 font-semibold rounded-md"
        >
          <h3
            className="capitalize cursor-pointer flex justify-between items-center"
            onClick={() => toggleSection(section._id)}
          >
            {section.sectionName}
            {openSections.has(section._id) ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </h3>

          {openSections.has(section._id) && (
            <ul className="bg-richblack-400 flex flex-col gap-2 mt-2 px-3 py-4 rounded-md">
              {section.subSection?.map((lecture) => (
                <li
                  key={lecture._id}
                  onClick={() => handleLectureClick(lecture)}
                  className={`cursor-pointer capitalize pl-2 py-1 rounded-md transition flex items-center gap-2
                    ${
                      activeLectureId === lecture._id
                        ? "bg-yellow-400 text-richblack-900 font-semibold"
                        : "hover:text-yellow-300 hover:bg-richblack-300"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <BsCameraVideoFill />
                    <span>{lecture.title}</span>
                    {isLectureCompleted(lecture._id) && (
                      <FaCheckCircle className="text-green-500" />
                    )}
                  </div>
                  {
                    videoEnded && user && user?.role === "student" && (
                      <RatingAndReviewModal lectureId={lecture._id} />
                    )
                  }
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseSidebar;
