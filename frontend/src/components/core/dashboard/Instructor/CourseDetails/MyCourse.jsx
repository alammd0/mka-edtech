import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../../app/slice/authSlice";
import { getAllCourse } from "../../../../../services/opreation/courseAPI";
import { useEffect } from "react";
import { setCourse } from "../../../../../app/slice/courseSlice";
import { formatDate } from "../../../../../utils/date";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyCourse = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const fetchCourse = async () => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Please waiting....");
    try {
      const response = await getAllCourse();

      if (!response || !response.data) {
        throw new Error("No data received from server");
      }

      setCourseDetails(response.data);
      dispatch(setCourse(response.data));
      toast.success("Courses fetched successfully");
      toast.dismiss(toastId);
    } catch (err) {
      console.error("Error fetching courses:", err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";
      toast.error(errorMessage);
      toast.dismiss(toastId);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchCourse();
  }, [location]);

  return (
    <div>
      {loading ? (
        <div>{loading}</div>
      ) : (
        <div>
          <p
            className={`text-[16px] font-inter font-normal tracking-widest capitalize`}
          >
            {location.pathname}
          </p>

          <p className="text-richblack-5 mt-4 text-2xl font-semibold font-inter ml-2">
            My Course
          </p>

          <div className="space-y-8 p-8">
            {courseDetails.map((course) => (
              <div
                key={course._id}
                className="bg-richblack-800 border border-richblack-700 rounded-lg shadow-lg overflow-hidden md:flex"
              >
                <div className="md:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} thumbnail`}
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="p-6 md:w-2/3 flex flex-col justify-between font-inter">
                  <div>
                    <h2 className="text-2xl font-bold text-richblack-5 mb-2">
                      {course.title}
                    </h2>
                    <p className="text-richblack-300 mb-4">
                      {course.description}
                    </p>
                    <p className="text-sm text-richblack-400 mb-4">
                      Created: {formatDate(course.createdAt)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg text-richblack-300">
                      Timing:{" "}
                      <span className="font-semibold text-richblack-300">
                        {course.totalDuration} min
                      </span>
                    </p>
                    <p className="text-lg font-semibold text-caribbeangreen-300">
                      ₹ {course.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-lg self-end">
                    <button
                      title="Edit"
                      className="text-richblack-300 hover:text-yellow-50 transition-colors duration-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      // TODO: Implement course deletion logic
                      // onClick={() => handleCourseDelete(course._id)}
                      className="text-richblack-300 hover:text-pink-200 transition-colors duration-200"
                    >
                      <FaTrashAlt />
                    </button>

                    <Link
                      className="text-richblack-300 font-inter"
                      to={`/dashboard/my-courses/${course._id}`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourse;
