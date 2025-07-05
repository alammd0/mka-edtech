const express = require("express");
const router = express.Router();

const {buyCourse, verifyPayment, findParchesCourse, findPaymentHistory} = require("../controllers/razorpayController");
const {authentication, usermiddleware} = require("../middleware/authMiddleware");


router.post("/buycourse", authentication, usermiddleware, buyCourse);
router.post("/verify-payment", authentication, usermiddleware, verifyPayment);
router.get("/get-parches-course", authentication, usermiddleware, findParchesCourse);
router.get("/payment-history", authentication, usermiddleware, findPaymentHistory);

module.exports = router