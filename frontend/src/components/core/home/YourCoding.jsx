import React from "react";
import { HeighLight } from "./HeighLight";
import { ButtonBtn } from "./ButtonBtn";

const YourCoding = ({ txt1, hText, txt2, para, btn1, btn2 }) => {
  return (
    <div className="md:w-[50%] flex flex-col gap-24 mb-5">

      <div className="flex flex-col gap-6">

        <div className="flex gap-2 flex-col">
          <p className="flex  text-3xl font-bold gap-2 capitalize font-inter">
            {txt1} <HeighLight text={hText} />{" "}
          </p>
          <p className=" text-3xl font-bold gap-2 capitalize font-inter">{txt2}</p>
        </div>

        <div className="tex-[16px] text-richblack-300 font-medium font-inter">
          <p>{para}</p>
        </div>

      </div>

      <div className="flex gap-10">
        <ButtonBtn
          Text={btn1}
          link="/login"
          bgColor="bg-[#FFD60A] text-white px-6 py-2 rounded-md"
        />
        <ButtonBtn
          Text={btn2}
          link="/signup"
          bgColor="bg-[#161D29] text-white px-6 py-2 rounded-md"
        />
      </div>

    </div>
  );
};

export default YourCoding;
