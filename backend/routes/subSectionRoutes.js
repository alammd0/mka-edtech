const express = require("express"); 
const router = express.Router();
const {authentication, instructormiddleware} = require("../middleware/authMiddleware")
const { createSubsection, updateSubSection, deleteSubsection } = require("../controllers/subSectionControllers");

router.post("/create-sub-section", authentication, instructormiddleware, createSubsection);
router.put("/update-sub-section", authentication, instructormiddleware, updateSubSection);
router.delete("/delete-sub-section", authentication, instructormiddleware, deleteSubsection);


module.exports = router;