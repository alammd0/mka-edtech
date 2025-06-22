import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import { HeighLight } from "../components/core/home/HeighLight";
import { ButtonBtn } from "../components/core/home/ButtonBtn";
import Banner from "../assets/Images/banner.mp4";
import YourCoding from "../components/core/home/YourCoding";
import CodingSection from "../components/core/home/CodingSection";
import Card from "../components/core/home/Card";

export const Home = () => {
  return (
    <div>
      <div className="mt-[110px] w-9/12 mx-auto">
        {/* section-01 */}
        <div className="flex flex-col items-center justify-center gap-7">
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
             hover:scale-105 transition-all duration-150"
          >
            <Link className="flex items-center" to="login">
              Become an Instructor
              <p className="mt-1">
                <MdOutlineArrowRight />
              </p>
            </Link>
          </button>

          <div className="flex  flex-col gap-5">
            <p className="text-3xl font-bold flex gap-2 font-inter text-center mx-auto">
              Empower Your Future with <HeighLight text="Coding Skills" />
            </p>
            <p className="text-center md:max-w-[820px]">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </p>
          </div>

          <div className="flex gap-10">
            <ButtonBtn
              Text="Learn More"
              link="/signup"
              bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
            />

            <ButtonBtn
              Text="Book a Demo"
              link="/about"
              bgColor="bg-[#161D29] text-white px-6 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="mt-10 mb-10 flex items-center justify-center ">
          <video
            width="75%"
            autoPlay
            muted
            loop
            className="rounded-xl video-box-shadaw"
          >
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="flex flex-col gap-20 mb-10 pt-20">
          {/* Coding Section - 01*/}
          <div className="flex gap-20">
            <YourCoding
              txt1="Unlock your"
              hText="coding potential"
              txt2="with our online courses."
              para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              btn1="Try Your Self"
              btn2="Learn More"
            />

            <CodingSection />
          </div>

          {/* Coding Section - 02 */}
          <div className="flex gap-20">
            <CodingSection />
            <YourCoding
              txt1="Unlock your"
              hText="coding potential"
              txt2="with our online courses."
              para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              btn1="Try Your Self"
              btn2="Learn More"
            />
          </div>
        </div>

        <div className="mt-40 mb-52 text-center relative">
          <p className="flex gap-2 text-3xl font-bold items-center justify-center">
            Unlock the <HeighLight text="Power of Code" />
          </p>
          <p className="text-[16px] text-richblack-300 mt-2">
            Learn to Build Anything You Can Imagine
          </p>
          <div className=" absolute">
            <Card />
          </div>
        </div>
      </div>

      <div className="bg-richblack-5 pt-[130px] pb-28 bg-image">
            <div className="flex gap-10 items-center justify-center mt-10">
                <ButtonBtn  Text="Explore Full Catalog" link="/signup" 
                bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md" />
                <ButtonBtn  Text="Learn More" link="/login" 
                bgColor="bg-[#161D29] text-white px-6 py-2 rounded-md" />
             </div>
      </div>


    </div>
  );
};
