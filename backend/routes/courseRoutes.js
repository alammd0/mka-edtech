const express = require("express");
const {
  authentication,
  usermiddleware,
  instructormiddleware,
} = require("../middleware/authMiddleware");

const {
  createcourse,
  updatecourse,
  getallscourses,
  getcoursedetails,
  deletecourse,
} = require("../controllers/courseController");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

const {
  createSubsection,
  updateSubSection,
  deleteSubsection,
} = require("../controllers/subSectionControllers");

const {
  createcategory,
  getallcategory,
} = require("../controllers/categoryController");

const { buyCourse } = require("../controllers/paymentControllers");
 

const router = express.Router();

// Course purchase and verification routes
router.post("/buy-course", authentication, usermiddleware, buyCourse);


// Instructor-only routes
router.post(
  "/create-course",
  authentication,
  instructormiddleware,
  createcourse
);
router.put(
  "/update-course/:id",
  authentication,
  instructormiddleware,
  updatecourse
);

router.delete(
  "/delete-course/:id",
  authentication,
  instructormiddleware,
  deletecourse
);

// Public course routes
router.get("/get-all-courses", getallscourses);
router.get("/get-course-details/:id", getcoursedetails);

// Section routes (instructor-only)
router.post(
  "/create-section",
  authentication,
  instructormiddleware,
  createSection
);

router.put(
  "/update-section",
  authentication,
  instructormiddleware,
  updateSection
);

router.delete(
  "/delete-section/:sectionId",
  authentication,
  instructormiddleware,
  deleteSection
);

// Sub-section routes (instructor-only)
router.post(
  "/create-sub-section",
  authentication,
  instructormiddleware,
  createSubsection
);

router.put(
  "/update-sub-section",
  authentication,
  instructormiddleware,
  updateSubSection
);
router.delete(
  "/delete-sub-section",
  authentication,
  instructormiddleware,
  deleteSubsection
);

// Category routes
router.post(
  "/create-category",
  authentication,
  instructormiddleware,
  createcategory
);
router.get("/get-category", getallcategory);

module.exports = router;
