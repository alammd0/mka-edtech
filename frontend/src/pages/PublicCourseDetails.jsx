import React, { useEffect, useState } from "react";
import { setLoading } from "../app/slice/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getcourseById } from "../services/opreation/courseAPI";
import { FaStar } from "react-icons/fa";
import { formatDate } from "../utils/date";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { Footer } from "../components/common/Footer";
import { buyCourse } from "../services/opreation/paymentAPI";

const PublicCourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCourseDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getcourseById(id);
      if (response?.data) {
        setCourseDetails(response.data);
      } else {
        toast.error("Course details not found.");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch course details."
      );
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  console.log(courseDetails);

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

  async function buyCourseHandler() {
    if (!token) {
      navigate("/login");
      return;
    }

    const toastId = toast.loading("Please wait...");
    try {
      const response = await buyCourse(id, token);
      if (!response) {
        throw new Error("No response from server");
      }

      const data = response;
      const options = {
        key: "rzp_test_OVzu1gByIvxtQY",
        amount: courseDetails.price * 100,
        currency: "INR",
        name: "EdTech Platform",
        description: `Thanks for buying: ${courseDetails.title}`,
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:4000/api/v1/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: courseDetails._id,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment successful & verified!");
            navigate("/dashboard/enrolled-courses");
          } else {
            toast.error("Payment verification failed");
          }

          toast.dismiss(toastId);
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  }

  // const isEnrolled = courseDetails?.studentEnrollment?.includes(user?._id);
  // const isAlreadyEnrolled = courseDetails?.studentEnrollment?.includes(userId)

  console.log("Student Enrollments:", courseDetails?.studentEnrollment);
  // console.log("User ID:", user?._id);

  const isAlreadyEnrolled = courseDetails?.studentEnrollment?.some(
    (id) => id.toString() === user?._id?.toString()
  );

  // console.log("Enrolled - ", isAlreadyEnrolled);

  return (
    <div className="mt-28">
      <div className="w-9/12 mx-auto mb-20">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : courseDetails.length === 0 ? (
          <div className="flex flex-col gap-8">
            <div className="relative flex items-center justify-between bg-richblack-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col gap-2 w-8/12">
                <h1 className="text-3xl font-semibold font-inter">
                  {courseDetails?.title}
                </h1>
                <p className="text-[16px] font-inter">
                  {courseDetails?.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-yellow-400 gap-1">
                    {renderStars(courseDetails.ratingAndReview?.length)}
                    <span className="text-richblack-300 ml-2">
                      ({courseDetails.ratingAndReview.length} reviews)
                    </span>
                  </div>
                  <div>
                    <span className="text-richblack-300 ml-2 capitalize">
                      {courseDetails.studentEnrollment?.length} students enrolled
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-richblack-300">
                  Created By {courseDetails.createBy?.firstName}{" "}
                  {courseDetails.createBy?.lastName}
                </p>
                <p className="text-richblack-300 flex items-center gap-2">
                  <IoIosTime /> Created At{" "}
                  {formatDate(courseDetails?.createdAt)}
                </p>
              </div>
              <div className="bg-richblack-300 absolute right-5 top-20 w-80 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between">
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <img
                      src={courseDetails.thumbnail}
                      alt={`${courseDetails.title} thumbnail`}
                      className="w-80 h-70 object-cover rounded-lg shadow-lg"
                    />
                    <p className="text-xl font-semibold text-richblack-800 font-inter mt-2">
                      Rs. {courseDetails.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {isAlreadyEnrolled ? (
                      <Link
                        to="/dashboard/enrolled-courses"
                        className="px-4 py-1 rounded-xl w-full text-[16px] font-semibold text-center bg-yellow-50 text-richblack-900"
                      >
                        Go to Course Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={
                          user.accountType === "Student"
                            ? buyCourseHandler
                            : undefined
                        }
                        disabled={user.accountType !== "Student"}
                        className={`px-4 py-1 rounded-xl w-full text-[16px] font-semibold bg-yellow-50 text-richblack-900 ${
                          user.accountType !== "Student"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Buy
                      </button>
                    )}

                    <button className="px-4 py-1 bg-richblue-400 rounded-xl w-full text-richblack-300 text-[16px] font-semibold">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:max-w-8/12 border-1 px-5 py-6 rounded-xl border-dotted border-richblack-100 shadow shadow-richblack-500">
              <h2 className="text-2xl font-inter font-semibold text-richblack-5">
                What You Will Learn
              </h2>
              <p className="text-richblack-300 mt-2 font-semibold font-inter">
                {courseDetails.whatWeLearn || "No details available"}
              </p>
            </div>
            <div className="md:max-w-8/12 border-1 px-5 py-6 rounded-xl border-dotted border-richblack-100 shadow shadow-richblack-500">
              <h2 className="border-b-1 pb-5 text-2xl font-inter font-semibold text-richblack-5">
                Course Content
              </h2>
              {courseDetails.section?.length > 0 ? (
                courseDetails.section.map((section, index) => (
                  <div
                    key={index}
                    className="mt-4 bg-richblack-300 space-y-2 p-4 rounded-lg text-richblack-800"
                  >
                    <h3 className="text-xl font-semibold capitalize">
                      {section.sectionName}
                    </h3>
                    {section.subSection?.map((subSection, subIndex) => (
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

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PublicCourseDetails;
