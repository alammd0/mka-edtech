import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../app/slice/authSlice";
import { getAllCourse } from "../services/opreation/courseAPI";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import ReviewAndRating from "../components/common/ReviewAndRating";

const Courses = () => {
  const [allcourses, setAllCourses] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchedCourse = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getAllCourse();
        if (!response || !response.data) {
          throw new Error("Server not responded");
        }
        setAllCourses(response.data);
      } catch (error) {
        console.error("err message - ", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        console.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchedCourse();
  }, []);

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
      <div className="w-9/12 mx-auto mb-20 flex flex-col justify-center">
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-white mb-12">
              Explore Our Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allcourses?.map((course) => (
                <div
                  key={course._id}
                  className="bg-richblack-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <Link
                    to={`/courses/course-details/${course._id}`}
                    className="p-2 flex flex-col justify-between h-full"
                  >
                    <div>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />

                      <h2 className="text-2xl font-bold text-white mb-2">
                        {course.title}
                      </h2>

                      <p className="text-richblack-300 mb-4">
                        {course.description.substring(0, 100)}...
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-yellow-400">
                        ₹{course.price}
                      </p>
                      <div className="flex items-center">
                        {renderStars(course.ratingAndReview.length)}
                        <span className="text-richblack-300 ml-2">
                          ({course.ratingAndReview.length} reviews)
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-[110px]">
        <ReviewAndRating />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
