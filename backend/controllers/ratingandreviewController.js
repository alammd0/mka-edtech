const Course = require("../models/Course");
const User = require("../models/User");
const ReviewAndRating = require("../models/RatingAndReview");
const RatingAndReview = require("../models/RatingAndReview");

// creating rating and review
exports.createRatingAndReview = async (req, res) => {
  try {
    // console.log("Request Data -", req.body);
    const { courseId, review, rating } = req.body;

    if (!courseId || !review || !rating) {
      return res.status(401).json({
        success: false,
        message: "Please provide input value",
      });
    }

    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Provide User Id",
      });
    }

    // find user using Id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found...",
      });
    }

    // find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Also not found",
      });
    }

    const existingRating = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    // console.log(existingRating);

    if (existingRating) {
      return res.status(404).json({
        success: false,
        message: "Your are already rating and review",
      });
    }

    // if user not gives rating and review then create rating and review
    const createRatingAndReview = await RatingAndReview.create({
      rating: rating,
      review: review,
      course: courseId,
      user: userId,
    });

    // push rating id in course
    course.ratingAndReview.push(createRatingAndReview._id);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Rating and review create successfully...",
      data: {
        createRatingAndReview,
        course: course,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      success: false,
      message: "Creating rating and review error",
    });
  }
};

// update rating and review
exports.updateRatingAndReview = async (req, res) => {
  try {
    // const { ratingAndReview } =
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      message: "Update rating and review error",
    });
  }
};

exports.getAllRatingandreview = async (req, res) => {
  try {
    const allRatingandreview = await RatingAndReview.find({})
      .populate("user")
      .populate("course") 
      .exec();

    if (!allRatingandreview || allRatingandreview.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Ratings and Reviews found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews fetched successfully.",
      data: allRatingandreview,
    });
  } catch (err) {
    console.error(err);
    return res.status(502).json({
      success: false,
      message: "Error while fetching Ratings and Reviews.",
    });
  }
};
