const express = require("express");
const { authentication, usermiddleware } = require("../middleware/authMiddleware")
const { createRatingAndReview, getAllRatingandreview } = require("../controllers/ratingandreviewController")

const router = express.Router();

router.post("/create-rating-review", authentication, usermiddleware, createRatingAndReview);
router.get("/get-all-rating-review", getAllRatingandreview);

module.exports = router;