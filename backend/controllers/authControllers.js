const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
  try {

    // console.log("Req ki Data - ",  req.body);
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType
    } = req.body;

    // check input not missing
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(404).json({
        success: false,
        message: "All input is Required..",
      });
    }

    // check user exist or not
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(203).json({
        message: "User Already Exits..",
        success: false,
      });
    }

    if (password.length >= 5 && password.length <= 9) {
      if (password !==  confirmPassword) {
        return res.status(502).json({
          success: false,
          message: "Passwords do not match.",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create User Profiles also
      const profileDetails = await Profile.create({
        dob: null,
        about: null,
        profilePic: null,
        gender: null,
        phone : null
      });

      // Create user
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType,
        profile: profileDetails.id,
      });

      return res.status(200).json({
        message: "User Signup Successfully..",
        success: true,
        data: newUser,
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(503).json({
      success: false,
      message: "signup Error, Please check details",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All Field Are required..",
      });
    }

    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(404).json({
        success: false,
        message: "User Not Exits Please Login...",
      });
    }

    // compare password
    const comparePassword = await bcrypt.compare(password, exist.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Password does not match.",
      });
    }

    // Payload for JWT
    const payload = {
      id: exist._id,
      name: exist.firstName + " " + exist.lastName,
      accountType: exist.accountType,
      email: exist.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set token in user
    exist.password = undefined;
    exist.token = token;

    return res
      .cookie("token", token, {
        https: true,
        expiresIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: false,
        message: "User Login Success",
        data: exist,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(502).json({
      message: "Login Credential error",
    });
  }
};

// get User
exports.getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById(userId).select("-password").populate("profile").populate("courseProgress").exec();

    if (!findUser) {
      return res.status(401).json({
        message: "User Not Found..",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetch Success",
      data: findUser,
    });
    
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: "User not Fetch Successfully..",
      success: false,
    });
  }
};

// forget-password
exports.forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (!email || !newPassword || !confirmNewPassword) {
      return res.status(402).json({
        success: false,
        message: "All field required...",
      });
    }

    // check exits or not
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not found...",
      });
    }

    // check newPassword and conformNewPassword
    if (newPassword !== confirmNewPassword) {
      return res.status(404).json({
        success: false,
        message: "Password not Match...",
      });
    }

    // hashed new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // console.log("Hased password - ", hashedNewPassword);

    // then update user with newPassword
    const updatedPassword = await User.updateOne(
      { email : existingUser.email},
      { password: hashedNewPassword }
    );

    // return
    return res.status(200).json({
      success: true,
      message: "Password Update Success",
    });
    
  } catch (err) {
    console.err(err);
    return res.status(502).json({
      success: false,
      message: "Password Change error, Please Check...",
    });
  }
};
