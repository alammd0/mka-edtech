const express = require("express");
const { signup, login , getuser} = require("../controllers/authControllers")
const { authentication } = require("../middleware/authMiddleware")

const router = express.Router();

// create auth route
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", authentication, getuser);

module.exports = router;