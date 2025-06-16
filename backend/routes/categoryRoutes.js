const express = require("express");
const { createcategory } = require("../controllers/categoryController");
const {
  authentication,
  instructormiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-category",
  authentication,
  instructormiddleware,
  createcategory
);

module.exports = router;
