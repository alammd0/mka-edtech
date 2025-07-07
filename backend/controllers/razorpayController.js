const Razorpay = require("razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const Payment = require("../models/Payment");
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Payment failed duce server error",
    });
  }
};

// verify payment and course details in user courses
exports.verifyPayment = async (req, res) => {
  try {
    // console.error(req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const userId = req.user.id;
    // console.error("User ID - ", userId);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // console.error("Sign -", sign);

    // generated_signature = hmac_sha256( order_id + "|" + razorpay_payment_id,secret);

    const paymentSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (paymentSignature !== razorpay_signature) {
      // Find course details to get the price
      const course = await Course.findById(courseId);

      // Create a new payment record for the failed payment
      const payment = new Payment({
        user: userId,
        course: courseId,
        amount: course ? course.price : 0,
        currency: "INR",
        paymentStatus: "failed",
        paymentId: razorpay_payment_id,
      });

      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // here add course..
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    // console.error("Course -", course);
    // console.error("user id -", user);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        message: "User or Course not found.",
      });
    }

    if (!user.courses.some((id) => id.equals(courseId))) {
      user.courses.push(new mongoose.Types.ObjectId(courseId));
      // console.error("Attempting to save user...");
      await user.save();
      // console.error("User saved successfully.");
    }

    if (!course.studentEnrollment.some((id) => id.equals(userId))) {
      course.studentEnrollment.push(new mongoose.Types.ObjectId(userId));
      // console.error("Attempting to save course...");
      await course.save();
      // console.error("Course saved successfully.");
    }

    // Create a new payment record
    const payment = new Payment({
      user: userId,
      course: courseId,
      amount: course.price,
      currency: "INR",
      paymentStatus: "success",
      paymentId: razorpay_payment_id,
    });
    
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified..",
    });
  } catch (error) {
    console.error("Error", error);
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

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "section",
          populate: {
            path: "subSection",
          },
        },
      })
      .populate("courseProgress")
      .exec();

    const getDurationInSeconds = (duration) => {
      if (typeof duration === "number") {
        return duration;
      }
      if (typeof duration === "string") {
        const parts = duration.split(":").map(Number);
        if (parts.length === 2) {
          const [mins, secs] = parts;
          if (!isNaN(mins) && !isNaN(secs)) {
            return mins * 60 + secs;
          }
        }
        const single_part = Number(duration);
        if (!isNaN(single_part)) {
          return single_part;
        }
      }
      return 0;
    };

    const coursesWithDurationAndProgress = user.courses.map((course) => {
      let totalDurationInSeconds = 0;
      let totalSubSections = 0;

      course.section.forEach((section) => {
        totalSubSections += section.subSection.length;
        section.subSection.forEach((sub) => {
          totalDurationInSeconds += getDurationInSeconds(sub.timeDuration);
        });
      });

      const courseProgress = user.courseProgress.find(
        (progress) => progress.course.toString() === course._id.toString()
      );

      const completedVideos = courseProgress ? courseProgress.completedVideos.length : 0;
      console.log(`Course: ${course.title}, Completed Videos: ${completedVideos}, Total SubSections: ${totalSubSections}`);
      const progressPercentage = totalSubSections > 0 ? (completedVideos / totalSubSections) * 100 : 0;

      const hours = Math.floor(totalDurationInSeconds / 3600);
      const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
      const seconds = Math.floor(totalDurationInSeconds % 60);

      const totalDuration = `${String(hours).padStart(2, "0")}h:${String(
        minutes
      ).padStart(2, "0")}m:${String(seconds).padStart(2, "0")}sec`;

      return {
        ...course.toObject(),
        totalDuration,
        progressPercentage,
      };
    });

    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User not found...",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Our buying course are there",
      data: {
        coursesWithDuration: coursesWithDurationAndProgress,
        user,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Not fetch purchases Course, due to server error...",
    });
  }
};

// find Payment history
exports.findPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await Payment.find({});

    if (!paymentHistory) {
      return res.status(404).json({
        success: false,
        message: "Payment history Not found...",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Payment history Like this....",
      data: paymentHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "fetch payment history failed...",
    });
  }
};
