import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getcourseById } from "../../../../../services/opreation/courseAPI";
import CourseSidebar from "./CourseSidebar";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaPipButton,
  MediaCaptionsButton,
} from "media-chrome/react";

const OneCourseDetails = () => {
  const [courseDetail, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { id } = useParams();

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

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  console.log("Course - ", courseDetail);
  console.log("selected Video -", selectedVideo);

  return (
    <div>
      {loading ? (
        <div className=" w-full h-full flex items-center justify-center">
          <p className="spinner"></p>
        </div>
      ) : (
        <div className="flex">
          <CourseSidebar
            course={courseDetail}
            onVideoSelect={(video) => setSelectedVideo(video)}
            selectedVideo={selectedVideo}
          />
          <div className="p-6 flex-4/5 bg-richblack-900 ml-[2%]">
            {selectedVideo ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-4 font-inter">
                  {selectedVideo?.title}
                </h2>

                <MediaController className="relative w-full aspect-[16/9] mx-auto bg-richblack-800 rounded overflow-hidden">
                  <ReactPlayer
                    src={selectedVideo?.videoURL}
                    slot="media"
                    controls={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      "--controls": "none",
                      borderRadius: "10px",
                      boxShadow: "initial",
                    }}
                  />
                  <MediaControlBar className="bg-richblack-300 flex items-center justify-between px-4 py-2 text-white text-sm gap-3 z-10">
                    <MediaPlayButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaSeekBackwardButton
                      seekOffset={10}
                      className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition"
                    />
                    <MediaSeekForwardButton
                      seekOffset={30}
                      className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition"
                    />

                    <MediaTimeRange className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaTimeDisplay className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />

                    <MediaMuteButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaVolumeRange className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />

                    <MediaPlaybackRateButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaCaptionsButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaPipButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                    <MediaFullscreenButton className="bg-transparent hover:bg-yellow-400/20 p-2 rounded transition" />
                  </MediaControlBar>
                </MediaController>

                <div className="bg-richblack-700 px-4 py-6 rounded-md flex flex-col gap-4">
                  <p className="bg-richblack-300 px-2 py-4 shadow rounded-md shadow-richblack-700">
                    {courseDetail.description}
                  </p>
                  <p className="bg-richblack-300 px-2 py-4 shadow rounded-md shadow-richblack-700 capitalize">
                    {courseDetail.whatWeLearn}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="bg-richblack-300 px-2 py-4 shadow rounded-md shadow-richblack-700 capitalize">
                      {courseDetail.tag}
                    </p>
                    <p className="bg-richblack-300 px-2 py-4 shadow rounded-md shadow-richblack-700 capitalize">
                      {courseDetail.instruction}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No video selected.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OneCourseDetails;
