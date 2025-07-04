const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
