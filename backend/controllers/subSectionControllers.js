const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const {
  UploadToCloudinary,
  uploadImageToCloudinary,
} = require("../utils/Upload");

// create Subsection
exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    if (!title || !sectionId || !description || !video) {
      return res.status(502).json({
        success: false,
        message: "All fields are required...",
      });
    }

    const uploadedVideo = await uploadImageToCloudinary(
      process.env.CLOUDINARY_FOLDER_NAME,
      video
    );

    if (!uploadedVideo || !uploadedVideo.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Video upload failed. No secure_url returned.",
      });
    }

    const newSubSectionDetails = await SubSection.create({
      section: sectionId,
      title,
      description,
      timeDuration: `${uploadedVideo.duration || 0}`,
      videoURL: uploadedVideo.secure_url,
    });

    // Update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSectionDetails._id },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedSection,
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      success: false,
      message: "Create Subsection error...",
    });
  }
};

// update sub-Section
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById({ _id: subSectionId });

    if (!subSection) {
      return res.status(402).json({
        success: false,
        message: "No found Subsection is given Subsection id",
      });
    }

    if (title) {
      subSection.title = title;
    }

    if (description) {
      subSection.description = description;
    }

    if (req.files && req.files.video) {
      const video = req.files.video;
      const uploadVideo = await uploadImageToCloudinary(
        process.env.CLOUDINARY_FOLDER_NAME,
        video
      );
      subSection.videoURL = uploadVideo.secure_url;
      subSection.timeDuration = `${uploadVideo.duration}`;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "Update Subsection...",
      data: subSection,
    });
  } catch (err) {
    console.error(err);
    return res.status(502).json({
      success: false,
      message: "Update Course error",
    });
  }
};

// delete sub-section
exports.deleteSubsection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      {
        new: true,
      }
    );

    const deleteSubsection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    return res.status(200).json({
      success: true,
      message: "Subsection delete Successfully",
      data: deleteSubsection,
    });
  } catch (err) {
    console.error(err);
    return res.status(501).json({
      success: false,
      message: "Delete Section error",
    });
  }
};

exports.markSubSectionCompleted = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        message: "Please provide courseId and subSectionId",
      });
    }

    // Find or create CourseProgress
    let progress = await CourseProgress.findOne({
      course: courseId,
      user: userId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: userId,
        course: courseId,
        completedVideos: [subSectionId],
      });

      // console.log("Rech here")

      // update user with courseProgress 
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courseProgress: progress._id,
          },
        }
      )

      // console.log("reach here")

    } else {
      // Add subSectionId to completedVideos if not present
      if (!progress.completedVideos.includes(subSectionId)) {
        progress.completedVideos.push(subSectionId);
      }
    }

    const course = await Course.findById(courseId).populate({
      path: "section",
      populate: {
        path: "subSection",
      },
    });

    const totalSubSections = course.section.reduce(
      (acc, curr) => acc + curr.subSection.length,
      0
    );

    const completedCount = progress.completedVideos.length;
    console.log(completedCount);
    const percentage =
      totalSubSections > 0 ? (completedCount / totalSubSections) * 100 : 0;
    console.log(percentage);
    progress.progressPercentage = percentage.toFixed(2);

    await progress.save();
    res.status(200).json({
      message: "SubSection marked as completed and progress updated",
      progress: progress,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to mark SubSection completed",
      error: error.message,
    });
  }
};
