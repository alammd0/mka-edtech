import React from 'react'
import AuthForm from '../components/common/auth/AuthFrom'
import AuthImage from '../components/common/auth/AuthImage'

const Login = () => {
  return (
    <div className='w-9/12 mx-auto flex mt-[130px] mb-[44px] justify-between gap-20 items-center'>
        <AuthForm type="login"></AuthForm>
        <AuthImage type="login"></AuthImage>
    </div>
  )
}

export default Login