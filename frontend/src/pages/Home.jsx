import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import { HeighLight } from "../components/core/home/HeighLight";
import { ButtonBtn } from "../components/core/home/ButtonBtn";
import Banner from "../assets/Images/banner.mp4";
import YourCoding from "../components/core/home/YourCoding";
import CodingSection from "../components/core/home/CodingSection";
import Card from "../components/core/home/Card";
import Logo1 from "../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../assets/TimeLineLogo/Logo4.svg";
import Timeline from "../assets/Images/TimelineImage.png";
import CompareWithOther from "../assets/Images/Compare_with_others.png";
import KnowYourProgress from "../assets/Images/Know_your_progress.png";
import PlanYourLesson from "../assets/Images/Plan_your_lessons.png";
import Instructor from "../assets/Images/Instructor.png";
import { Footer } from "../components/common/Footer";
import ReviewAndRating from "../components/common/ReviewAndRating";

export const Home = () => {
  return (
    <div>
      <div className="mt-[110px] lg:w-9/12 w-11/12 mx-auto">
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

          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold md:flex gap-2 font-inter text-center mx-auto">
              Empower Your Future with <HeighLight text="Coding Skills" />
            </p>
            <p className="md:text-center md:max-w-[820px]">
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
            width="90%"
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
          <div className="lg:flex gap-20">
            <YourCoding
              txt1="Unlock your"
              hText="coding potential"
              txt2="with our online courses."
              para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              btn1="Try Your Self"
              btn2="Learn More"
            />

            <div className="h-10 lg:hidden block"></div>
            <CodingSection />
          </div>

          {/* Coding Section - 02 */}
          <div className="lg:flex gap-20 flex-row-reverse">
            <YourCoding
              txt1="Start"
              hText="coding in seconds"
              txt2="With Edtech"
              para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              btn1="Continue lesson"
              btn2="Learn More"
            />

            <div className="h-10 lg:hidden block"></div>
            <CodingSection />
          </div>
        </div>

        <div className="mt-40 lg:h-[20px] h-[410px] mb-52 text-center relative">
          <p className="flex gap-2 text-3xl font-bold items-center justify-center font-inter">
            Unlock the <HeighLight text="Power of Code" />
          </p>
          <p className="text-[16px] text-richblack-300 mt-2 font-inter">
            Learn to Build Anything You Can Imagine
          </p>
          <div className="absolute">
            <Card />
          </div>
        </div>
      </div>

      {/* section - 02 */}
      <div className="bg-richblack-5 lg:pt-[150px] pb-28 bg-image">
        <div className="h-14 lg:hidden block"></div>

        <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
          <ButtonBtn
            Text="Explore Full Catalog"
            link="/signup"
            bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
          />
          <ButtonBtn
            Text="Learn More"
            link="/login"
            bgColor="bg-[#161D29] text-white px-6 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-richblack-5 pt-[5px] pb-20">
        <div className="mt-[110px] w-9/12 mx-auto">
          <div className="flex flex-col gap-24">
            <div className="flex flex-wrap justify-between items-center gap-y-8">
              <div className="w-full md:w-[48%] flex flex-col text-3xl font-bold capitalize text-richblack-900 font-inter">
                Get the skills you need for a{" "}
                <HeighLight text="job that is in demand."></HeighLight>
              </div>

              <div className="w-full md:w-[48%] text-[16px] text-richblack-900 font-normal font-inter">
                The modern Edtech is the dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="w-full md:w-[50%] flex justify-center flex-col gap-10">
                <div className="flex items-center gap-6 pl-2">
                  <div className="bg-white p-3 rounded-full shadow-sm shadow-richblack-900">
                    <img className="h-6" src={Logo1} alt="Logo1" />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-richblack-900 font-semibold font-inter capitalize">
                      Leadership
                    </p>
                    <p className="text-richblack-800 text-[16px] font-normal font-inter">
                      Fully committed to the success company
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-white p-3 rounded-full shadow-sm shadow-richblack-900">
                    <img className="h-6" src={Logo2} alt="logo2" />
                  </div>
                  <div>
                    <p className="text-richblack-900 font-semibold font-inter capitalize">
                      Responsibility
                    </p>
                    <p className="text-richblack-800 text-[16px] font-normal font-inter">
                      Students will always be our top priority
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-white p-3 rounded-full shadow-sm shadow-richblack-900">
                    <img className="h-6" src={Logo3} alt="logo3" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-richblack-900 font-semibold font-inter capitalize">
                      Flexibility
                    </p>
                    <p className="text-richblack-800 text-[16px] font-normal font-inter">
                      The ability to switch is an important skills
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-white p-3 rounded-full shadow-sm shadow-richblack-900">
                    <img className="h-6" src={Logo4} alt="logo4" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-richblack-900 font-semibold font-inter capitalize">
                      Solve the problem
                    </p>
                    <p className="text-richblack-800 text-[16px] font-normal font-inter">
                      Code your way to a solution
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[50%] relative">
                <div className="rounded-md shadow-md shadow-pink-100">
                  <img className="rounded-md" src={Timeline} alt="No image" />
                </div>
                <div className="bg-green-700 absolute bottom-5 left-1/2 -translate-x-1/2 md:left-32 md:top-96 md:bottom-auto md:translate-x-0 flex px-8 py-5 justify-between rounded-xl shadow-sm shadow-richblack-600">
                  <div className="flex flex-col mr-10 border-r-1 border-dotted  pr-10 text-center">
                    <p className="font-bold text-xl font-inter">10</p>
                    <p className=" font-normal text-xl font-inter">Years</p>
                  </div>
                  <div className="flex flex-col text-center">
                    <p className="font-bold text-xl font-inter">250</p>
                    <p className="font-normal text-xl font-inter">
                      Type of Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[120px] flex flex-col gap-10">
            <div className="text-center flex flex-col gap-2">
              <p className="text-3xl font-black flex items-center mx-auto gap-2 capitalize font-inter text-richblack-800">
                Your swiss knife for <HeighLight text="learning any language" />{" "}
              </p>
              <p className="text-[16px] font-normal text-richblack-800 font-inter md:max-w-[820px] mx-auto">
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom
                schedule and more.
              </p>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[-50px] mt-10">
              <img
                src={KnowYourProgress}
                alt="know"
                className="z-10 -rotate-6 shadow-lg rounded-lg w-full sm:w-[300px] md:w-[350px]"
              />
              <img
                src={CompareWithOther}
                alt="compare"
                className="z-10 rotate-0 shadow-2xl rounded-lg w-full sm:w-[300px] md:w-[350px]"
              />
              <img
                src={PlanYourLesson}
                alt="plan"
                className="z-10 rotate-6 shadow-lg rounded-lg w-full sm:w-[300px] md:w-[350px]"
              />
            </div>

            <div className="mt-12 flex items-center justify-center">
              <ButtonBtn
                Text="Learn More"
                link="/signup"
                bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[110px] lg:w-9/12 w-11/12 w- mx-auto mb-[20px]">
        <div className="flex flex-col md:flex-row justify-between gap-20 items-center">
          <div className="w-full md:w-[50%]">
            <img
              src={Instructor}
              alt="person"
              className="instructor-shadow rounded-md w-full"
            />
          </div>

          <div className="w-full md:w-[50%] flex flex-col justify-center gap-5">
            <p className="flex gap-2 text-3xl font-black font-inter">
              Become an
              <HeighLight text="instructor"></HeighLight>
            </p>

            <p className="text-richblack-300 font-inter">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div>
              <ButtonBtn
                Text="Start Teaching Today!"
                link="/signup"
                bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[110px] mb-28">
        <ReviewAndRating />
      </div>

      <Footer />
    </div>
  );
};
