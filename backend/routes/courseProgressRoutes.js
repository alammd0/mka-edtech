const express = require("express");
const { authentication, usermiddleware} = require("../middleware/authMiddleware");
const { createCourseProgress, getCourseProgress } = require("../controllers/courseProgresController");

const router = express.Router();

// create auth route
// router.post("/mark-completed", authentication, usermiddleware, createCourseProgress);
router.get("/get-course-progress", authentication, usermiddleware, getCourseProgress);

module.exports = router;