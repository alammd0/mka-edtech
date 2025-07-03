import React, { useEffect, useState } from "react";
import { setLoading } from "../app/slice/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { buyCourse, getcourseById } from "../services/opreation/courseAPI";
import { FaStar } from "react-icons/fa";
import { formatDate } from "../utils/date";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { Footer } from "../components/common/Footer";

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [showModal, setShowModal] = useState(false);

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

  const handleBuyCourse = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const orderResponse = await buyCourse(id, token);
      console.log("Order response:", orderResponse);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.order.amount,
        currency: "INR",
        order_id: orderResponse.data.order.id,
        name: "MKA Ed-Tech",
        description: `Payment for ${courseDetails.title}`,
        handler: function (response) {
          // Call verifyPayment here
          console.log("Payment Success", response);
          toast.success("Payment successful!");
          navigate("/dashboard/enrolled-courses");
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
        toast.error("Payment Failed: " + response.error.description);
      });
    } catch (error) {
      console.error("Buy Course Error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  // const verifyPayment = async (paymentResponse, courseId, token) => {
  //   try {
  //     await verifyPaymentAPI(
  //       {
  //         razorpay_order_id: paymentResponse.razorpay_order_id,
  //         razorpay_payment_id: paymentResponse.razorpay_payment_id,
  //         razorpay_signature: paymentResponse.razorpay_signature,
  //         courseId,
  //       },
  //       token
  //     );
  //     toast.success("Payment successful! You are now enrolled in the course.");
  //     navigate("/dashboard/enrolled-courses");
  //   } catch (error) {
  //     console.error("Payment Verification Error:", error);
  //     toast.error(
  //       error.response?.data?.message || "Payment verification failed."
  //     );
  //   }
  // };

  // const handleBuyCourse = async () => {
  //   if (!token) {
  //     navigate("/login");
  //   }

  //   try {
  //     const response = await buyCourse(id, token);

  //     console.log(response);
  //   } catch (err) {
  //     console.log("Error Agya bhai..");
  //   }
  // };

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

  // const isEnrolled = courseDetails?.studentsEnrolled?.includes(user?._id);

  return (
    <div className="mt-28">
      <div className="w-9/12 mx-auto mb-20">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : courseDetails ? (
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
                    <span className="text-richblack-300 ml-2">
                      {courseDetails.studentsEnrolled?.length} students enrolled
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-richblack-300">
                  Created By {courseDetails.instructor?.firstName}{" "}
                  {courseDetails.instructor?.lastName}
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
                    <button
                      onClick={() => setShowModal(true)}
                      // disabled={isEnrolled}
                      className={`px-4 py-1 rounded-xl w-full text-[16px] font-semibold`}
                    >
                      Buy Now
                    </button>

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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
            <p className="mb-4">Do you want to buy this course?</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleBuyCourse();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetails;
