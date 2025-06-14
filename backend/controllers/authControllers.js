const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// signup
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      conformPassword,
      accountType,
      phone,
    } = req.body;

    // check input not missing
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !conformPassword ||
      !accountType ||
      !phone
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
      if (password !== conformPassword) {
        return res.status(502).json({
          success: false,
          mesaage: "Password do not match..",
        });
      }

      // hased Password
      const hasedPassword = bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hasedPassword,
        phone,
        accountType,
      });
    } else {
      return res.status(402).json({
        mesaage: "Password to small",
        success: false,
      });
    }

    // create Token
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.name,
    };

    const token  = jwt.sign(payload, process.env.JWT_SECERET, {expiresIn : "7d"});

    return res.status(200).json({
        message : "User Signup Successfully..",
        success : true,
        data : newUser,
        token : token
    })

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      success: false,
      message: "signup Error, Please check details",
    });
  }
};

// login

export const login = async (req, req) => {
    try{

    }
    catch(error){
        console.log(err)
        return res.status(502).json({
            message : "Login Credential error"
        })
    }
}
