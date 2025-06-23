import React from "react";
import { HeighLight } from "../components/core/home/HeighLight";
import About1 from "../assets/Images/aboutus1.webp";
import About2 from "../assets/Images/aboutus2.webp";
import About3 from "../assets/Images/aboutus3.webp";

const About = () => {
  return (
    <div>

      <div className="bg-richblack-800 mt-[70px] relative">
        <div className="w-9/12 mx-auto pt-[60px] pb-44">

          <div className="flex flex-col gap-8 justify-center items-center">
            <p className="text-2xl font-semibold font-inter">About Us</p>

            <p className="flex flex-col text-center font-inter capitalize text-3xl font-bold">
              Driving Innovation in Online Education for a{" "}
              <HeighLight text="Brighter Future" />
            </p>

            <p className="text-center md:max-w-[820px] text-richblack-300">
              Edtech is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>

          <div className="flex gap-4 absolute top-[350px]">
            <img className="rounded-md" src={About1} alt="about" />
            <img className="rounded-md" src={About2} alt="about" />
            <img className="rounded-md" src={About3} alt="about" />
          </div>
        </div>
      </div>

      <div>

      </div>
      
    </div>
  );
};

export default About;
