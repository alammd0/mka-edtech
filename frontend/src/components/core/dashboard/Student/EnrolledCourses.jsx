import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getParchesCourse } from "../../../../services/opreation/paymentAPI";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CommonCourses from "../common/Courses";

const EnrolledCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courseDetail, setCourseDetails] = useState([]);
  const token = useSelector((state) => state.auth.token);
  console.log("Token", token);

  const fetchCourse = async () => {
    const toastId = toast.loading("Please wait...");
    setLoading(true);

    try {
      const response = await getParchesCourse(token);

      if (!response) {
        toast.error("Server not response");
        return;
      }

      console.log("Purchase course...", response.data);
      setCourseDetails(response.data);
      toast.success("Success load parches courses...");
    } catch (err) {
      console.log("Error Find - ", err);
      toast.error(err.message);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [token]);

  console.log(courseDetail);

  return (
    <div>
      {loading ? (
        <div>{loading}</div>
      ) : (
        <div>
          <CommonCourses courseDetails={courseDetail} />
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
