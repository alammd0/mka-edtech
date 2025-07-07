const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const User = require("../models/User");

// // calculate the percentage of course learning path
// exports.createCourseProgress = async (req, res) => {
//   try {

//     // find courseId and subSectionId
//     const { courseId } = req.body;
//     if (!courseId) {
//       return res.status(400).json({
//         message: "Please provide course id",
//       });
//     }

//     // find userId
//     const userId = req.user.id;
//     if (!userId) {
//       return res.status(400).json({
//         message: "Please provide user id",
//       });
//     }

//     // find course progress exit or not
//     const progress = await CourseProgress.findOne({
//       course: courseId,
//       user: userId,
//     });

//     if (!progress) {
//       // create course progress
//       const courseProgress = await CourseProgress.create({
//         user: userId,
//         course: courseId,
//       });

//     } else{

//     }

//     // here calculate percentage
//     // find all sub section of course
//     const sections = await Section.find({ courseId: courseId }).select("_id");
//     const sectionIds = sections.map((section) => section._id);
//     const sectionLength = sectionIds.length;

//     const completedVideos = progress.completedVideos.length;
//     const percentage = (completedVideos / sectionLength) * 100;
//     progress.percentage = percentage;

//     await progress.save();
//     res.status(200).json({
//       message: "Course progress created successfully",
//       progress: progress,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating course progress",
//       error: error.message,
//     });
//   }
// };

// exports.createCourseProgress = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     if (!courseId) {
//       return res.status(400).json({
//         message: "Please provide course id",
//       });
//     }

//     const userId = req.user.id;
//     if (!userId) {
//       return res.status(400).json({
//         message: "Please provide user id",
//       });
//     }

//     // Find or create progress
//     let progress = await CourseProgress.findOne({
//       course: courseId,
//       user: userId,
//     });

//     if (!progress) {
//       progress = await CourseProgress.create({
//         user: userId,
//         course: courseId,
//       });
//     }

//     // ✅ Calculate percentage: count total SubSections
//     const sections = await Section.find({ courseId: courseId }).select("_id");
//     const sectionIds = sections.map((section) => section._id);

//     const totalSubSections = await SubSection.countDocuments({
//       parentSection: { $in: sectionIds },
//     });

//     const completedVideos = progress.completedVideos.length;

//     const percentage =
//       totalSubSections > 0 ? (completedVideos / totalSubSections) * 100 : 0;

//     progress.progressPercentage = percentage.toFixed(2);

//     await progress.save();

//     res.status(200).json({
//       message: "Course progress created or updated successfully",
//       progress: progress,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating course progress",
//       error: error.message,
//     });
//   }
// };

exports.getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseProgress = await CourseProgress.findOne({ user: userId }).populate("course").exec();
    res.status(200).json({
      message: "Course progress fetched successfully",
      courseProgress: courseProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course progress",
      error: error.message,
    });
  }
};
