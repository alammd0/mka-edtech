import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getcourseById } from "../../../../services/opreation/courseAPI";
import CourseDetailsVideo from "../common/CourseDetails";

const EnrolledCoursesDetails = () => {
  const [courseDetail, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const courseProgress = user?.courseProgress?.find(
    (progress) => progress.course === id
  );

  const fetchCourseDetails = async () => {
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    try {
      const response = await getcourseById(id);
      if (!response || !response.data) {
        throw new Error("No server response");
      }

      setCourseDetails(response.data);
      // Auto select first video
      const firstSection = response.data?.section?.[0];
      const firstVideo = firstSection?.subSection?.[0];
      if (firstVideo) setSelectedVideo(firstVideo);

      toast.success("Course details loaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load course.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  console.log("Course Details -", courseDetail);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className=" w-full h-full flex items-center justify-center">
          <p className="spinner"></p>
        </div>
      ) : (
        <div className="flex">
          <CourseDetailsVideo
            courseProgress={courseProgress}
            courseDetail={courseDetail}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesDetails;
