const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    thumnail: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },

    tag: {
      type: String,
      required: true,
    },

    whatWeLearn: {
      type: String,
      required: true,
    },

    intruction: {
      type: String,
      required: true,
    },

    section: {
      type: mongoose.Types.ObjectId,
      ref: "Section",
    },

    ratingAndReview: {
      type: mongoose.Types.ObjectId,
      ref: "RatingAndReview",
    },

    studentEnrollment: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
