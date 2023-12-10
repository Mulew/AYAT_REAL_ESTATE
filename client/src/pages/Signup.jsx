import React from 'react'
import {Link} from 'react-router-dom'
const Signup = () => {
  return (
    <div className='p-2 max-w-md mx-auto'>
      <h1 className='my-7 text-sxl text-center font-semibold'>Signup</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' 
        className='border p-1  rounded-lg' id='username' />
        <input type='email' placeholder='Email' 
        className='border p-1  rounded-lg' id='email' />
        <input type='password' placeholder='password' 
        className='border p-1  rounded-lg' id='password' />
        <button type='button' className='bg-slate-700 p-1 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>Sign up</button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to = '/signin'>
            <span className=' text-blue-700'>signin</span>
          </Link>
        </div>
    </div>
  )
}

export default Signup;
