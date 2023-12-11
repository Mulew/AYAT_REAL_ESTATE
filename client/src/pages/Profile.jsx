import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentuser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-1'>
        <img src={currentuser.avatar} alt={currentuser.username} 
        className='w-24 h-24 rounded-full mx-auto object-cover cursor-pointer self-center mt-2'/>
        <input type='text' id='username' placeholder='Username' className='border border-gray-300 rounded-lg p-3 my-2'/>
        <input type='email' id='email' placeholder='email' className='border border-gray-300 rounded-lg p-3 my-2'/>
        <input type='password' id='password' placeholder='password' className='border border-gray-300 rounded-lg p-3 my-2'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile;
