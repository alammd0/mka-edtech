const Payment = require("../models/Payment");
const User = require("../models/User");
const Course = require("../models/Course");
const Razorpay = require("razorpay");

exports.buyCourse = async (req, res) => {
  console.log("Reached buyCourse route");

  try {
    console.log(req.body);

    const { courseId } = req.body;
    console.log("Course Id - ", courseId);

    const userId = req.user.id;

    if (!courseId) {
      return res.status(401).json({
        message: "Course id not Found...",
        success: false,
      });
    }

    if (!userId) {
      return res.status(402).json({
        success: false,
        message: "User id not Found",
      });
    }

    // find course
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Details not found...",
      });
    }

    // find user details
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User details not found",
      });
    }

    // check this user already buy or not
    if (userDetails.courses.includes(courseId)) {
      return res.status(202).json({
        success: true,
        message: "You already buy this course",
      });
    }

    // if not then do

    // 1. create Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 2. create order
    const options = {
      amount: courseDetails.amount * 100,
      currency: "INR",
      receipt: `receipt_no_${Date.now()}`,
      notes: {
        userId,
        courseId,
      },
    };

    const orderPayment = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: orderPayment,
    });
  } catch (error) {
    console.log("error - ", error);
    return res.status(404).json({
      success: false,
      message: "Something went wrong while creating the order",
      error: err.message,
    });
  }
};
