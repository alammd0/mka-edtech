const express = require("express");
const { authentication, 
        usermiddleware, 
        instructormiddleware } = require("../middleware/authMiddleware");

const { 
    createcourse, 
    updatecourse, 
    getallscourses, 
    getcoursedetails, 
    deletecourse } = require("../controllers/courseController");

const router = express.Router();


// access by only instructor
router.post("/create-course", authentication, instructormiddleware, createcourse);
router.put("/update-course/:id", authentication, instructormiddleware, updatecourse);
router.delete("/delete-course/:id", authentication, instructormiddleware, deletecourse);

// access by only user and instructor
router.get("/get-all-courses", authentication, getallscourses);
router.get("/get-course-details", authentication, getcoursedetails);

module.exports = router;