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
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
