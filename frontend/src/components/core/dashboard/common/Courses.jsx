import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CommonCourses = ({ courseDetails }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
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
                </div>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-richblack-300">
                    <span className="font-semibold text-richblack-300">
                      {course.totalDuration}
                    </span>
                  </p>
                  {user.accountType !== "Student" ? (
                    <p className="text-lg font-semibold text-caribbeangreen-300">
                      ₹ {course.price}
                    </p>
                  ) : (
                    <div style={{ width: 70, height: 70 }}>
                      <CircularProgressbar
                        value={course.progressPercentage || 0}
                        text={`${(course.progressPercentage || 0)}%`}
                        styles={buildStyles({
                          pathColor: `rgba(62, 152, 199, ${
                            (course.progressPercentage || 0)
                          })`,
                          textColor: "#f1f1f1",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-lg self-end">
                  {user.accountType !== "Student" ? (
                    <div className="flex gap-4">
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
                    </div>
                  ) : (
                    ""
                  )}

                  <Link
                    className="text-richblack-300 font-inter"
                    to={
                      user.accountType !== "Student"
                        ? `/dashboard/my-courses/${course._id}`
                        : `/dashboard/enrolled-courses/${course._id}`
                    }
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonCourses;
