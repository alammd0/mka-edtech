import React from 'react'
import AuthForm from '../components/common/auth/AuthFrom'
import AuthImage from '../components/common/auth/AuthImage'

const Signup = () => {
  return (
    <div className='md:w-9/12 w-11/12 mx-auto flex mt-[130px] mb-[44px] gap-20 items-center'>
        <AuthForm type="signup"></AuthForm>
        <AuthImage type="signup"></AuthImage>
    </div>
  )
}

export default Signup