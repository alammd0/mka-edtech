import React from "react";
import Frame from "../../../assets/Images/frame.png";
import Login from "../../../assets/Images/login.webp";
import Signup from "../../../assets/Images/signup.webp";

const AuthImage = ({ type }) => {
  return ( 
    <div className="md:w-[50%] w-full hidden lg:block">
      {type === "signup" && <img className="rounded-2xl shadow-2xl shadow-richblack-800" src={Signup} alt="Signup" />}
      {type === "login" && <img className="rounded-2xl shadow-2xl shadow-richblack-800" src={Login} alt="Login" />}
    </div>
  );
};

export default AuthImage;
