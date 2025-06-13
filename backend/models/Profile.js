const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    dob: {
      type: Date,
    },
    about: {
      type: String,
      maxlength: 500,
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
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
