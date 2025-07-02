import React, { useEffect, useState } from "react";
import { setLoading } from "../app/slice/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getcourseById } from "../services/opreation/courseAPI";
import { FaStar } from "react-icons/fa";
import { formatDate } from "../utils/date";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { Footer } from "../components/common/Footer";

const CourseDetails = () => {
  const [CourseDetails, setCourseDetails] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log("Course ID - ", id);

  const fetchCourseDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getcourseById(id);

      if (!response || !response.data) {
        throw new Error("No server response");
      }
      setCourseDetails(response.data);
      toast.success("Course details loaded successfully");
    } catch (error) {
      console.error("Error fetching course details:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
      toast.error(errorMessage);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  console.log("Course Details - ", CourseDetails);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-28">
      <div className="w-9/12 mx-auto mb-20">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="flex flex-col">
            {CourseDetails ? (
              <div className="flex flex-col gap-8">
                {/* To details */}
                <div className="relative flex items-center justify-between bg-richblack-800 p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col gap-2 w-8/12">
                    <h1 className="text-3xl font-semibold font-inter">
                      {CourseDetails.title}
                    </h1>
                    <p className="text-[16px font-inter">
                      {CourseDetails.description}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-yellow-400 gap-1">
                        {" "}
                        {renderStars(CourseDetails.ratingAndReview.length)}
                        <span className="text-richblack-300 ml-2">
                          ({CourseDetails.ratingAndReview.length} reviews)
                        </span>
                      </div>

                      <div>
                        {CourseDetails.studentEnrollment.length > 0 ? (
                          <span className="text-richblack-300 ml-2">
                            {CourseDetails.studentEnrollment.length} students
                            enrolled
                          </span>
                        ) : (
                          <span className="text-richblack-300 ml-2">
                            5478 students enrolled
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-richblack-300">
                      Created By{" "}
                      {CourseDetails.createBy.firstName +
                        " " +
                        CourseDetails.createBy.lastName}
                    </p>
                    <p className="text-richblack-300 flex items-center gap-2">
                      <IoIosTime /> Created At{" "}
                      {formatDate(CourseDetails.createdAt)}
                    </p>
                  </div>

                  {/* Card */}
                  <div className="bg-richblack-300 absolute right-5 top-20 w-80 p-4  rounded-lg shadow-lg flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center gap-4">
                      <div>
                        <img
                          src={CourseDetails.thumbnail}
                          alt={`${CourseDetails.title} thumbnail`}
                          className="w-80 h-70 object-cover rounded-lg shadow-lg"
                        />
                        <p className="text-xl font-semibold text-richblack-800 font-inter mt-2">Rs. {CourseDetails.price}</p>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <button className="px-4 py-1 bg-yellow-5 rounded-xl w-full text-richblack-800 text-[16px] font-semibold">Buy Now</button>
                        <button className="px-4 py-1 bg-richblue-400 rounded-xl w-full text-richblack-300 text-[16px] font-semibold">Share</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What we Learn About */}
                <div className="md:max-w-8/12 border-1 px-5 py-6 rounded-xl border-dotted border-richblack-100 shadow shadow-richblack-500">
                  <h2 className="text-2xl font-inter font-semibold text-richblack-5">
                    What You Will Learn
                  </h2>
                  <p className="text-richblack-300 mt-2 font-semibold font-inter">
                    {CourseDetails.whatWeLearn
                      ? CourseDetails.whatWeLearn
                      : "No details available"}
                  </p>
                </div>

                {/* Course Content */}
                <div className="md:max-w-8/12 border-1 px-5 py-6 rounded-xl border-dotted border-richblack-100 shadow shadow-richblack-500">
                  <h2 className="border-b-1 pb-5 text-2xl font-inter font-semibold text-richblack-5">
                    Course Content
                  </h2>
                  {CourseDetails.section && CourseDetails.section.length > 0 ? (
                    CourseDetails.section.map((section, index) => (
                      <div
                        key={index}
                        className="mt-4 bg-richblack-300 space-y-2 p-4 rounded-lg text-richblack-800"
                      >
                        <h3 className="text-xl font-semibold capitalize">
                          {section.sectionName}
                        </h3>
                        {section.subSection &&
                          section.subSection.map((subSection, subIndex) => (
                            <p
                              key={subIndex}
                              className="ml-4 text-[16px] font-semibold font-inter capitalize flex items-center gap-2"
                            >
                              <BsCameraVideoFill /> {subSection.title}
                            </p>
                          ))}
                      </div>
                    ))
                  ) : (
                    <p>No content available for this course.</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-lg text-red-500">Course not found</p>
            )}
          </div>
        )}
      </div>

      <div>
         <Footer/>
      </div>
    </div>
  );
};

export default CourseDetails;
