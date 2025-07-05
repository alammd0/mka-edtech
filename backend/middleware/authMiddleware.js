const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authentication = async (req, res, next) => {
  try {
    // console.log(req.cookies?.token);

    // console.log("AUTH: Received token:", req.headers.authorization);
    
    const token =
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token;

    console.log("Token - ", token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Authorization token is missing",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal authentication error",
    });
  }
};

// create private routes
exports.instructormiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    console.log(user);

    if (user.accountType !== "Instructor") {
      return res.status(503).json({
        success: false,
        message: "Access Denied: Only instructors can access this route",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(502).json({
      success: false,
      message: "instructor middleware routes error",
    });
  }
};

exports.usermiddleware = async (req, res, next) => {
  // console.log("USER MIDDLEWARE: Current user:", req.user);

  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    if (user.accountType !== "Student") {
      return res.status(503).json({
        success: false,
        message: "Access Denied: Only User can access this route",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: false,
      message: "user middleware error",
    });
  }
};
