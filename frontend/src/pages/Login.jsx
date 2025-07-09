import React from 'react'
import AuthForm from '../components/common/auth/AuthFrom'
import AuthImage from '../components/common/auth/AuthImage'

const Login = () => {
  return (
    <div className='md:w-9/12 w-11/12 mx-auto flex md:mt-[130px] mt-[30%]  mb-[44px] justify-between gap-20 items-center'>
        <AuthForm type="login"></AuthForm>
        <AuthImage type="login"></AuthImage>
    </div>
  )
}

export default Login