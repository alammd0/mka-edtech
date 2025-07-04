const express = require("express");
const router = express.Router();

const {buyCourse, verifyPayment, findParchesCourse} = require("../controllers/razorpayController");
const {authentication, usermiddleware} = require("../middleware/authMiddleware");


router.post("/buycourse", authentication, usermiddleware, buyCourse);
router.post("/verify-payment", authentication, usermiddleware, verifyPayment);
router.get("/get-parches", authentication, usermiddleware, findParchesCourse);

module.exports = router