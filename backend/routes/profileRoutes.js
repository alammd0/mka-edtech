const express = require("express");
const { authentication } = require("../middleware/authMiddleware");
const { updatePassword, updateProfile, updatedProfilePic } = require("../controllers/profileControllers");

const router = express.Router();

router.put("/update-password", authentication, updatePassword)
router.put("/update-profile", authentication, updateProfile);
router.put("/update-profile-image", authentication, updatedProfilePic);

module.exports = router;