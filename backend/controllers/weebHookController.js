const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.stripeWebhook = async (req, req) => {
  try {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook signature verification failed:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    //  handle success payment event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courseId = session.metadata.courseId;

      const userDetails = await User.findById(userId);
      if (userDetails) {
        if (!userDetails.courses.includes(courseId)) {
          userDetails.courses.push(courseId);
          await userDetails.save();
          console.log(`Course ${courseId} added to the user ${userId}`);
        }
      }
    }

    return res.status(200).json({
        success : true,
        message : "Payment Success"
    })
  } catch (error) {
    console.log("Error", error);
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
