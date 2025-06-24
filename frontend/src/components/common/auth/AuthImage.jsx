import React from "react";
import Frame from "../../../assets/Images/frame.png";
import Login from "../../../assets/Images/login.webp";
import Signup from "../../../assets/Images/signup.webp";

const AuthImage = ({ type }) => {
  return (
    <div>
      <div>
        {type === "signup" && <img src={Signup} alt="Signup" />}
        {type === "login" && <img src={Login} alt="Login" />}
      </div>
    </div>
  );
};

export default AuthImage;
