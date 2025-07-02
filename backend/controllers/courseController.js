const User = require("../models/User");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

const {
  UploadToCloudinary,
  uploadImageToCloudinary,
} = require("../utils/Upload");

const Category = require("../models/Category");
const dotenv = require("dotenv");
dotenv.config();

// create Course
exports.createcourse = async (req, res) => {
  try {
    let { title, description, price, category, tag, whatWeLearn, instruction } =
      req.body;

    const thumbnail = req.files.thumbnail;
    console.log(thumbnail);

    // find user id;
    const userId = req.user.id;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !tag ||
      !whatWeLearn ||
      !instruction ||
      !thumbnail
    ) {
      return res.status(501).json({
        success: false,
        message: "All fields required please check which field is empty",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Found User Id",
      });
    }

    // find category if
    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: "Category Details Not Found...",
      });
    }

    // find account types
    const user = await User.findById(userId);

    if (!user || user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "User details Not Found",
      });
    }

    // upload image on Cloudinary
    const folder = process.env.CLOUDINARY_FOLDER_NAME;
    const imageUpload = await uploadImageToCloudinary(folder, thumbnail);

    // create Course
    const createNewCourse = await Course.create({
      title: title,
      description: description,
      price: price,
      instruction: instruction,
      tag: tag,
      category: categoryDetails.id,
      whatWeLearn: whatWeLearn,
      createBy: userId,
      thumbnail: imageUpload.secure_url,
    });

    // after create update user course array
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: createNewCourse.id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created Successfully...",
      data: createNewCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Course Not Create, BCZ send error...",
    });
  }
};

// Update Course
exports.updatecourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Course Id - ", id);

    let { title, description, price, category, tag, whatWeLearn, instruction } =
      req.body;

    const thumbnail = req.files?.thumbnail;

    // find user id;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Found User Id",
      });
    }

    // prepareUpdate Data
    let updateCourse = {};
    if (title) {
      updateCourse.title = title;
    }

    if (description) {
      updateCourse.description = description;
    }

    if (price) {
      updateCourse.price = price;
    }

    if (category) {
      // find category if
      const categoryDetails = await Category.findById(category);

      if (!categoryDetails) {
        return res.status(401).json({
          success: false,
          message: "Category Details Not Found...",
        });
      }

      description.categoryDetails.id = categoryDetails;
    }

    if (tag) {
      updateCourse.tag = tag;
    }

    // What We Learn
    if (whatWeLearn) {
      updateCourse.whatWeLearn = whatWeLearn;
    }

    // Instruction
    if (instruction) {
      updateCourse.instruction = instruction;
    }

    if (thumbnail) {
      // upload image on Cloudinary
      const folder = process.env.CLOUDINARY_FOLDER_NAME;
      const imageUpload = await UploadToCloudinary(folder, thumbnail);

      updateCourse.thumbnail = imageUpload.secure_url;
    }

    // find account types
    const user = await User.findById(userId);

    if (!user || user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "User details Not Found",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateCourse, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(401).json({
        success: false,
        message: "No, Course Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Update course",
      data: updateCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(304).json({
      success: false,
      message: "Course Update Failed, Please Check",
    });
  }
};

exports.getallscourses = async (req, res) => {
  try {

    const courses = await Course.find(
      {},
      {
        title: true,
        description: true,
        price: true,
        thumbnail: true,
        whatWeLearn: true,
        instruction: true,
        tag: true,
        createBy: true,
        ratingAndReview: true,
        studentEnrollment: true,
        createdAt: true,
        section: true,
      }
    )
      .populate("createBy", "firstName lastName email profile")
      .populate({
        path: "section",
        populate: {
          path: "subSection",
          select: "timeDuration",
        },
      })
      .exec();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    const getDurationInMinutes = (durationStr) => {
      if (typeof durationStr === "number") return durationStr;
      const [mins, secs] = durationStr.split(":").map(Number);
      return mins + secs / 60;
    };

    const updatedCourses = courses.map((course) => {
      let totalMinutes = 0;

      course.section.forEach((sec) => {
        sec.subSection.forEach((sub) => {
          if (sub.timeDuration) {
            totalMinutes += getDurationInMinutes(sub.timeDuration);
          }
        });
      });

      return {
        _id: course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        createdAt: course.createdAt,
        thumbnail: course.thumbnail,
        createBy: course.createBy,
        ratingAndReview: course.ratingAndReview,
        studentEnrollment: course.studentEnrollment,
        totalDuration: totalMinutes.toFixed(2),
      };
    });

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: updatedCourses,
    });

  } catch (error) {

    console.error("Error in getallscourses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });

  }
};

// Get a single course by its ID, including all its sections and subsections.
exports.getcoursedetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    // Find the course and populate all necessary fields
    const courseDetails = await Course.findById(id)
      .populate({
        path: "createBy",
        select: "firstName lastName email profile",
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "section",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Course with id ${id} not found`,
      });
    }

    // Helper to parse "mm:ss" duration strings
    const getDurationInMinutes = (durationStr) => {
      if (typeof durationStr === "number") return durationStr;
      const [mins, secs] = durationStr.split(":").map(Number);
      return mins + secs / 60;
    };

    // Calculate total duration
    let totalMinutes = 0;
    courseDetails.section.forEach((sec) => {
      sec.subSection.forEach((sub) => {
        if (sub.timeDuration) {
           totalMinutes += getDurationInMinutes(sub.timeDuration);
        }
      });
    });

    const courseData = courseDetails.toObject();
    courseData.totalDuration = totalMinutes.toFixed(2);

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully.",
      data: courseData,
    });
  } catch (err) {
    console.error("Error fetching course details:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course details.",
    });
  }
};

// Delete Course
exports.deletecourse = async (req, res) => {
  try {
    // fetch course id in parameter
    const { id } = req.params;

    // find user id;
    const userId = req.user.id;

    // check course is valid or not
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Please provide Valid Course....",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Found User Id",
      });
    }

    // find account types
    const user = await User.findById(userId);

    if (!user || user.accountType !== "INSTRUCTOR") {
      return res.status(401).json({
        success: false,
        message: "User details Not Found",
      });
    }

    // find course and delete
    const courseDelete = await Course.findByIdAndDelete(id);

    if (!courseDelete) {
      return res.status(401).json({
        success: false,
        message: "Not Valid course Are Available",
      });
    }

    // also update user because you deleted a course
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          courses: id,
        },
      },
      {
        new: true,
      }
    );

    // then return response
    return res.status(201).json({
      success: true,
      message: "Course delete successfully...",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "not delete, check some error found",
    });
  }
};
