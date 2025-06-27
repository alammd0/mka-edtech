import React from 'react'
import CreateTips from '../Course/CreateTips'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import Section from './Section';


const CourseBuilder = () => {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <button>
        <Link to="/" className="flex items-center gap-1 text-richblack-300">
          <p>
            <IoIosArrowBack />
          </p>
          <p>Back to DashBoard</p>
        </Link>
      </button>

      <div className="flex justify-between ml-5">
        <Section />
        <CreateTips />
      </div>
    </div>
  );
};

export default CourseBuilder;
