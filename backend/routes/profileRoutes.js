const express = require("express");
const { authentication } = require("../middleware/authMiddleware");
const { updatePassword, updateProfile } = require("../controllers/profileControllers");

const router = express.Router();

router.put("/update-password", authentication, updatePassword)
router.put("/update-profile", authentication, updateProfile);

module.exports = router;