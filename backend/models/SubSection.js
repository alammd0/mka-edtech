const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description : {
    type : String, 
    required : true
  },

  timeDuration: {
    type: String,
    default: "0:00", // optional default value
  },
  videoURL: {
    type: String,
    required: true,  // recommend making it required if each subsection must have a video
  },
}, { timestamps: true }); // optional but helpful

module.exports = mongoose.model("SubSection", subSectionSchema);
