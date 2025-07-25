const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  
  sectionName: {
    type: String,
    required: true,
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  subSection: [
    {
      type: mongoose.Types.ObjectId,
      ref: "SubSection",
    },
  ],

});

module.exports = mongoose.model("Section", sectionSchema);
