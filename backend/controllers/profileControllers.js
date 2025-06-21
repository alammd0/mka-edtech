const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// update password
exports.updatePassword = async (req, res) => {
  try {
    const id = req.user.id;
    console.log("User Id - ", id);

    const { changePassword, confirmChangePassword } = req.body;

    if (!changePassword || !confirmChangePassword) {
      return res.status(402).json({
        success: false,
        message: "All field Required",
      });
    }

    // check match password
    if (changePassword !== confirmChangePassword) {
      return res.status(400).json({
        success: false,
        message: "Password not match, please check..",
      });
    }

    // hased password
    const hasedChangePassword = await bcrypt.hash(changePassword, 10);

    const user = await User.findById(id);
    console.log("User - ", user);
    user.password = hasedChangePassword;
    await user.save();

    // if (!updatePassword) {
    //   return res.status(402).json({
    //     success: false,
    //     message: "Password not change...",
    //   });
    // }

    return res.status(200).json({
      success: false,
      message: "Password Change Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Password update error",
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { dob, gender, about } = req.body;

    if (!dob || !gender || !about) {
      return res.status(402).json({
        success: false,
        message: "All fielded required...",
      });
    }

    const user = await User.findById(userId);
    const profileDetails = await Profile.findById(user.profile);
    console.log("Profiles Details - ", profileDetails);

    profileDetails.dob = dob;
    profileDetails.about = about;
    profileDetails.gender = gender;

    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile Update succussfully...",
      data: profileDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(502).json({
      success: false,
      message: "Profile update failed...",
    });
  }
};


// delete Account


// update profile pic


// get enrollment course..
