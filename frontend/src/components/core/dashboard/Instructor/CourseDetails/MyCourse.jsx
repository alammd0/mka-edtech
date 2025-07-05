import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../../../services/opreation/courseAPI";
import { useEffect } from "react";
import { setCourse } from "../../../../../app/slice/courseSlice";
import CommonCourses from "../../common/Courses";

const MyCourse = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState([]);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const fetchCourse = async () => {
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
           <CommonCourses 
             courseDetails={courseDetails}
           />
        </div>
      )}
    </div>
  );
};

export default MyCourse;
