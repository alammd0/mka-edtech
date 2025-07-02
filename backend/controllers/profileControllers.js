const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/Upload");

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
    // FIX: use userId from body, not from JWT middleware
    const userId = req.body.userId;

    // destructure correctly if you pass nested
    const { userData, profileData } = req.body;
    const { firstName, lastName, email } = userData;
    const { dob, gender, about, phone } = profileData;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    await user.save();

    const profileDetails = await Profile.findById(user.profile);
    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    profileDetails.dob = dob || profileDetails.dob;
    profileDetails.gender = gender || profileDetails.gender;
    profileDetails.about = about || profileDetails.about;
    profileDetails.phone = phone || profileDetails.phone;

    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        ...user.toObject(),
        profile: profileDetails,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

// delete Account

// update profile pic
exports.updatedProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User Id - ", userId);

    console.log("Profile Pic - ", req.files);

    if (!req.files || !req.files.profilePic) {
      return res.status(400).json({
        success: false,
        message: "Please upload a profile picture",
      });
    }

    const profilePicFile = req.files.profilePic;

    // upload to cloudinary
    const folder = process.env.CLOUDINARY_FOLDER_NAME || "Edtech";
    const Image = await uploadImageToCloudinary(folder, profilePicFile);

    // find user profile
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // find Profile
    const profile = await Profile.findById(user.profile);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // update profile picture
    profile.profilePic = Image.secure_url;
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: {
        profilePic: profile,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "Profile Pic update error",
    });
  }
};

// get enrollment course..
