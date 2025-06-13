const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
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

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "INR",
  },

  paymentStatus: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
  
});

module.exports = mongoose.model("Payment", paymentSchema);
