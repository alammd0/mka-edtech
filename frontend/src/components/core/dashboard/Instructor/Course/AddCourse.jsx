import React from 'react'
import CourseInformation from './CourseInformation'
import CreateTips from './CreateTips'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

const AddCourse = () => {
  return (
    <div className='flex flex-col gap-2 mb-10'>
        <button>
            <Link to="/" className='flex items-center gap-1 text-richblack-300'>
             <p><IoIosArrowBack /></p>
             <p>Back to DashBoard</p>
            </Link>
        </button>

        <div className="flex justify-between ml-5">
            <CourseInformation />
            <CreateTips />
        </div>
    </div>
  )
}

export default AddCourse