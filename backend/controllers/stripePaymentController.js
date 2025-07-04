const Course = require("../models/Course");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    if (userDetails.courses.includes(courseId)) {
      return res.status(203).json({
        success: false,
        message: "You already Buy This Course...",
      });
    }

    // let create buying process (strip configurations)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: courseDetails.title,
            },
            unit_amount: courseDetails.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment Success",
      url: session.url,
    });
    
  } catch (error) {
    console.log("Error in given message -", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
