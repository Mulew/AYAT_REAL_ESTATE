import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { updatefailerror,updateusersuccess,updateuserstart,
        logoutuserstart,logoutfailerror,logoutusersuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
const Profile = () => {
  const [formdata, setformdata] = useState({});
  const { currentuser } = useSelector((state) => state.user);
  const {error,loading} = useSelector((state) => state.user);
  const [updatesuccess,setupdatesuccess] = useState(false);
  const [showlistings,setshowlistings] = useState(true);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateuserstart());
      const res = await fetch(`/api/users/update/${currentuser._id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(updateusersuccess(data.user));
        setupdatesuccess(true);
      }
      else{
        dispatch(updatefailerror(data.message));
        return;
      }

    }
    catch(err){
      dispatch(updatefailerror(err.message));
    }
  }
  const handlesignout =async()=>{
    try{
      dispatch(logoutuserstart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(logoutfailerror(data.message));
        return;
      }
      dispatch(logoutusersuccess());

    }
    catch(err){
      dispatch(logoutfailerror(err));
    }
  }
  const handleshowclick = async()=>{
    try{
      const res = await fetch(`/api/users/listings/${currentuser._id}`);
      const data = await res.json();
      setshowlistings(data);
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }
  const handledelete = async(Listing_ID)=>{
    try{
      const res = await fetch(`/api/listings/delete/${Listing_ID}`,{
        method:'delete'
      });
      const data = await res.json();
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
        <img
          src={currentuser.avatar}
          alt={currentuser.username}
          className='w-24 h-24 rounded-full mx-auto object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          id='username'
          placeholder='Username'
          name='username'
          defaultValue={currentuser.username}
          className='border border-gray-300 rounded-lg p-3 my-2'
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          name='email'
          defaultValue={currentuser.email}
          className='border border-gray-300 rounded-lg p-3 my-2'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          name='password'
          className='border border-gray-300 rounded-lg p-3 my-2'
          onChange={handleChange}
        />
        <button disabled = {loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' :'Update'}
        </button>
        <Link to={"/createListing"} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
        Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handlesignout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <div>
      <p className='text-red-700'>{error ? error : ''}</p>
      <p className='text-green-700'>{updatesuccess ? "User updated successfully!" : ''}</p>
      </div>
      <button onClick={handleshowclick} className='text-green-700 w-full'>Show Listings</button>
      {showlistings && showlistings.length > 0 && showlistings.map((listing) => {
        return (
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
            <Link to={`/listing/${listing._id}`}>
              <img
                src={`http://localhost:3000/images/` + listing.avatar}
                alt={listing.name}
                className='w-16 h-16  mx-auto object-contain rounded-lg cursor-pointer self-center mt-2'
              />
            </Link>
            <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hover:underline truncate '>
              <p className='text-slate-700 font-semibold flex-1 hover:underline truncate'>{listing.name}</p>
            </Link>
            <div className='flex flex-col items-center'>
              <button onClick={(e)=>handledelete(listing._id)} className='text-red-700 '>Delete</button>
              <button className='text-green-700'>Edit</button>
            </div>
          </div>
        );
      }
      )}
    </div>
  );
};

export default Profile;