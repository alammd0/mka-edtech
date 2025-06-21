const express = require("express");
const { signup, login , getuser, forgetPassword} = require("../controllers/authControllers")
const { authentication } = require("../middleware/authMiddleware")

const router = express.Router();

// create auth route
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", authentication, getuser);
router.put("/forget-password", forgetPassword);

module.exports = router;