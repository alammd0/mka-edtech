const express = require("express"); 
const router = express.Router();

const {createSection, updateSection, deleteSection} = require("../controllers/sectionController")
const {authentication, instructormiddleware} = require("../middleware/authMiddleware")


router.post("/create-section", authentication, instructormiddleware, createSection);
router.put("/update-section", authentication, instructormiddleware, updateSection);
router.delete("/delete-section/:sectionId", authentication, instructormiddleware, deleteSection)


module.exports = router;