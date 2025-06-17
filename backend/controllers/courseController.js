const User = require("../models/User");
const Course = require("../models/Course");
const { UploadToCloudinary } = require("../utils/Upload");
const Category = require("../models/Category");
const dotenv = require("dotenv");
dotenv.config();

// create Course
exports.createcourse = async (req, res) => {
  try {
    let { title, description, price, category, tag, whatWeLearn, instruction } =
      req.body;

    const thumbnail = req.files.thumbnail;

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

    if (!user || user.accountType !== "INSTRUCTOR") {
      return res.status(401).json({
        success: false,
        message: "User details Not Found",
      });
    }

    // upload image on Cloudinary
    const folder = process.env.CLOUDINARY_FOLDER_NAME;
    const imageUpload = await UploadToCloudinary(folder, thumbnail);

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

    if (!user || user.accountType !== "INSTRUCTOR") {
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

// get-all Course
exports.getallscourses = async (req, res) => {
  try {
    const courseDetails = await Course.find(
      {},
      {
        title: true,
        price: true,
        thumbnail: true,
        createBy: true,
        ratingAndReview: true,
        studentEnrollment: true,
      }
    )
      .populate("createBy", "firstName lastName email")
      .exec();

    if (!courseDetails) {
      return res.status(401).json({
        success: false,
        message: "Not Courses Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetch Successfully...",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Not Found Course, All course",
    });
  }
};

// Not test
// get-single course
exports.getcoursedetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Course Id Not Provide please Provide....",
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Details Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Details are fetch Succussfully...",
      data: course,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      message: "No Found course details",
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
          courses: courseDelete._id,
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
