const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();




exports.authentication = async (req, res, next) => {
  try {
    const authHeader =
      req.body.token || req.header("Authorization") || req.cookies.token;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (authHeader && !authHeader.startsWith("Bearer ")) {
      token = authHeader; 
    }


    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Token Verified Error Please Check...",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "No Found Token Please check...",
    });
  }
};
