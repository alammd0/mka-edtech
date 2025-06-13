const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    AccountType: {
      type: String,
      default: "USER",
      enum: ["USER", "INSTRUCTORS"],
    },

    courses: [{ type: mongoose.Types.ObjectId , 
        ref : "Course"
    }],

    profile: { type: mongoose.Types.ObjectId , 
        ref : "Profile"
    },

    courseProgress: [
      {
        type: mongoose.Types.ObjectId,
        ref : "CourseProgress"
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },

    approve: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
