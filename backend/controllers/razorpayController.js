const Razorpay = require("razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const crypto = require("crypto");
const mongoose = require("mongoose");

// buy courses
exports.buyCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Course ID",
      });
    }

    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not found user id, please login..",
      });
    }

    // find course using courseId
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(402).json({
        success: false,
        message: "Course Not Found...",
      });
    }

    // find user Details
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(402).json({
        success: false,
        message: "User Not Found",
      });
    }

    // check user already buy this course or not if buy then show already buy this course
    if (courseDetails.studentEnrollment.some((id) => id.equals(userId))) {
      return res.status(203).json({
        success: false,
        message: "You already bought this course.",
      });
    }

    // create razorpay order
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // create options
    const options = {
      amount: courseDetails.price * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    //  create order
    const paymentOrder = await instance.orders.create(options);

    // return response
    return res.status(200).json({
      success: true,
      orderId: paymentOrder.id,
      receipt: paymentOrder.receipt,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Payment failed duce server error",
    });
  }
};

// verify payment and course details in user courses
exports.verifyPayment = async (req, res) => {
  try {
    console.log(req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const userId = req.user.id;
    console.log("User ID - ", userId);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("Sign -", sign);

    // generated_signature = hmac_sha256( order_id + "|" + razorpay_payment_id,secret);

    const paymentSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (paymentSignature !== razorpay_signature) {
      return res.status(404).json({
        success: false,
        message: "Payment verifications failed",
      });
    }

    // here add course..
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    console.log("Course -", course);
    console.log("user id -", user);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        message: "User or Course not found.",
      });
    }

    if (!user.courses.some((id) => id.equals(courseId))) {
      user.courses.push(new mongoose.Types.ObjectId(courseId));
      console.log("Attempting to save user...");
      await user.save();
      console.log("User saved successfully.");
    }

    if (!course.studentEnrollment.some((id) => id.equals(userId))) {
      course.studentEnrollment.push(new mongoose.Types.ObjectId(userId));
      console.log("Attempting to save course...");
      await course.save();
      console.log("Course saved successfully.");
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified..",
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Payment verifications Failed",
    });
  }
};

// find parches course from user
exports.findParchesCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User Id Not fetch",
      });
    }

    const user = await User.findById(userId).populate("courses");

    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User not found...",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Our buying course are there",
      data: user.courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Not fetch purchases Course, due to server error...",
    });
  }
};
