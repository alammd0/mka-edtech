const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    dob: {
      type: Date,
    },

    about: {
      type: String,
      max_length: 500,
    },

    phone: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    profilePic: {
      type: String,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
