import React from "react";
import { HeighLight } from "../components/core/home/HeighLight";
import About1 from "../assets/Images/aboutus1.webp";
import About2 from "../assets/Images/aboutus2.webp";
import About3 from "../assets/Images/aboutus3.webp";
import { HeightLightTxt } from "../components/core/about/HeightLightTxt";
import FoundingStory from "../assets/Images/FoundingStory.png";
import ActiveCount from "../components/core/about/ActiveCount";
import { ButtonBtn } from "../components/core/home/ButtonBtn";
import GetTouchFrom from "../components/core/about/GetTouchFrom";
import { Footer } from "../components/common/Footer";
import ReviewAndRating from "../components/common/ReviewAndRating";

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

      <div className="mt-[280px] md:mb-[60px]">
        <p className="text-3xl font-bold text-center w-8/12 mx-auto capitalize font-inter">
          {" "}
          “We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <i>
            <u className="text-fuchsia-400">combines technology</u>
          </i>
          ,{" "}
          <i>
            <u className="text-amber-700">expertise</u>
          </i>{" "}
          and community to create an{" "}
          <i className="text-amber-400">unparalleled educational experience</i>”
        </p>
      </div>

      <div className="border-t-1 pt-20 pb-20 border-richblack-700">
        <div className="w-9/12 mx-auto flex flex-col gap-28">
          <div className="flex gap-20">
            <div className="md:w-[50%] flex flex-col gap-4">
              <p className="text-3xl font-bold font-inter">
                <HeightLightTxt text="Our Founding Story" />
              </p>

              <p className="text-[16px] text-richblack-400 font-inter">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p className="text-[16px] text-richblack-400 font-inter">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="md:w-[50%] shadow shadow-cyan-200 rounded-xl">
              <img
                className="h-[100%] rounded-xl"
                src={FoundingStory}
                alt="Here Image"
              />
            </div>
          </div>

          <div className="flex gap-20">
            <div className="md:w-[50%] flex flex-col gap-4">
              <p className="text-amber-600 text-3xl font-bold font-inter">
                Our Vision
              </p>

              <p className="text-[16px] text-richblack-400 font-inter">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            <div className="md:w-[50%] flex flex-col gap-4">
              <p>
                <HeighLight text="Our Mission" />
              </p>

              <p className="text-[16px] text-richblack-400 font-inter">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ActiveCount />

      <section class="text-white pt-20 pb-20 w-9/12 mx-auto">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <h2 class="text-3xl md:text-3xl font-bold font-inter">
              World-Class Learning for
              <HeighLight text=" Anyone, Anywhere" />
            </h2>
            <p class="text-[16px] text-richblack-300">
              Edtech partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </p>
            <ButtonBtn
              Text="Learn More"
              link="/signup"
              bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-slate-800 p-4 rounded-md">
              <h4 class="font-semibold mb-2">
                Curriculum Based on Industry Needs
              </h4>
              <p class="text-gray-400 text-sm">
                Save time and money! The Belabor curriculum is made to be easier
                to understand and in line with industry needs.
              </p>
            </div>

            <div class="bg-slate-800 p-4 rounded-md">
              <h4 class="font-semibold mb-2">Our Learning Methods</h4>
              <p class="text-gray-400 text-sm">
                The learning process uses the namely online and offline.
              </p>
            </div>

            <div class="bg-slate-800 p-4 rounded-md">
              <h4 class="font-semibold mb-2">Certification</h4>
              <p class="text-gray-400 text-sm">
                You will get a certificate that can be used as a certification
                during job hunting.
              </p>
            </div>

            <div class="bg-slate-800 p-4 rounded-md">
              <h4 class="font-semibold mb-2">Rating "Auto-grading"</h4>
              <p class="text-gray-400 text-sm">
                You will immediately get feedback during the learning process
                without having to wait for an answer or response from the
                mentor.
              </p>
            </div>

            <div class="bg-slate-800 p-4 grid rounded-md col-span-2">
              <h4 class="font-semibold mb-2">Ready to Work</h4>
              <p class="text-gray-400 text-sm">
                Connected with over 150+ hiring partners, you will have the
                opportunity to find a job after graduating from our program.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center mt-10  mb-10">
        <GetTouchFrom
          heading="Get in Touch"
          description="We’d love to here for you, Please fill out this form."
        />
      </div>

      <div className="mt-[110px]">
        < ReviewAndRating/>
      </div>

      <Footer />
    </div>
  );
};

export default About;
