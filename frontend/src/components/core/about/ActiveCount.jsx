import React from 'react'

const ActiveCount = () => {
  return (
    <div className='bg-richblack-800 mt-10 mb-10 pt-10 pb-10'>
        <div className='w-9/12 mx-auto flex flex-row justify-between'>
            <div className='flex flex-col items-center font-inter'>
                <p className='text-xl font-semibold font-inter'>5k</p>
                <p className='text-[16px] text-richblack-300 font-inter'>Active Students</p>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold font-inter'>10+</p>
                <p className='text-[16px] text-richblack-300 font-inter'>Mentors</p>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold font-inter'>200+</p>
                <p className='text-[16px] text-richblack-300 font-inter'>Courses</p>
            </div>

            <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold font-inter'>50+</p>
                <p className='text-[16px] text-richblack-300 font-inter'>Awards</p>
            </div>
        </div>
    </div>
  )
}

export default ActiveCount