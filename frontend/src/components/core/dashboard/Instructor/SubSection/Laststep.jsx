import React, { useState } from "react";
import { Link } from "react-router-dom";

const Laststep = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl font-inter mt-10">
      <h2 className="text-2xl font-semibold text-white">📢 Publish Settings</h2>

      {/* Checkbox section */}
      <div className="flex items-start gap-3 bg-richblack-800 p-5 rounded-lg">
        <input
          id="publish"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-5 h-5 accent-yellow-400 rounded border border-richblack-600 bg-richblack-700 focus:ring-2 focus:ring-yellow-400"
        />
        <label
          htmlFor="publish"
          className="text-base text-richblack-100 leading-tight"
        >
          Make sure this course is ready to be published.
        </label>
      </div>

      {/* Publish button (disabled if not checked) */}
      <Link
        to={isChecked ? "/dashboard/my-courses" : "#"}
        className={`inline-flex items-center gap-2 px-6 py-2 rounded-md w-fit text-[16px] font-medium transition-all duration-200 ${
          isChecked
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-richblack-600 text-richblack-300 cursor-not-allowed"
        }`}
        onClick={(e) => {
          if (!isChecked) e.preventDefault();
        }}
      >
        Publish Now
      </Link>
    </div>
  );
};

export default Laststep;
