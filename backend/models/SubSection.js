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
    default: "0:00", 
  },

  videoURL: {
    type: String,
    required: true, 
  },
}, { timestamps: true }); 

module.exports = mongoose.model("SubSection", subSectionSchema);
