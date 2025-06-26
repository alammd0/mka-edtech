import React from "react";

export const courseInstructions = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important updates.",
  "Notes to all enrolled students at once.",
];

const CreateTips = () => {
  return (
    <div className="flex flex-col gap-2 bg-richblack-800 md:w-[35%] mr-[3%]  h-fit px-4 py-3 rounded-xl shadow-2xs shadow-richblack-500">
      <p className="text-richblack-5 text-[16px] font-inter">⚡Course Upload Tips</p>
      <div>
        <ul className="flex gap-2 flex-col ml-7">
          {courseInstructions.map((data, index) => (
            <li className="list-disc font-inter" key={index}>{data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateTips;
