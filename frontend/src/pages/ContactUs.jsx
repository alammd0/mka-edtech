import React from "react";
import GetTouchFrom from "../components/core/about/GetTouchFrom";
import { TiMessages } from "react-icons/ti";
import { TbWorld } from "react-icons/tb";
import { MdOutlineCallEnd } from "react-icons/md";
import { Footer } from "../components/common/Footer";
import ReviewAndRating from "../components/common/ReviewAndRating";

const ContactUs = () => {
  return (
    <div className="mt-[120px]">
      <div className="w-9/12 mx-auto pb-20">
        <div className="flex justify-between">
          <div className="bg-richblack-800 h-fit px-10 py-5 rounded-xl shadow shadow-richblack-500 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold">
                <TiMessages />
              </p>
              <div>
                <p className="text-xl font-semibold text-richblack-5 font-inter">
                  Chat on us
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  Our friendly team is here to help.{" "}
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  mdkhalidalam001@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold">
                <TbWorld />
              </p>
              <div>
                <p className="text-xl font-semibold text-richblack-5 font-inter">
                  Visit us
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  Come and say hello at our office HQ.
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  Here is the location/ address
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold">
                <MdOutlineCallEnd />
              </p>
              <div>
                <p className="text-xl font-semibold text-richblack-5 font-inter">
                  Call us
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  Mon - Fri From 8am to 5pm
                </p>
                <p className="text-[16px] text-richblack-300 font-inter">
                  +123 456 7890
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-[50%]">
            <GetTouchFrom
              heading="Got a Idea? We’ve got the skills. Let’s team up"
              description="Tall us more about yourself and what you’re got in mind."
            />
          </div>
        </div>
      </div>

      <div className="mt-[110px]">
        <ReviewAndRating />
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
