const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedVideos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubSection",
      },
    ],

    progressPercentage: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
