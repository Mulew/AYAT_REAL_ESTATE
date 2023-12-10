import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formdata,setformdata] = useState({})
  const [error,seterror] = useState(null)
  const [loading,setloading] = useState(false)
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]:e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true)
   try{
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },body:JSON.stringify(formdata)
    })

    const data = await res.json();
    if(data.success == false){
      seterror(data.message)
      setloading(false);
      return;
    }
    setloading(false);
    seterror(null);
    // navigate('/signin');
  }
  catch(e){
    setloading(false);
    seterror(e.message);
   }
}
  return (
    <div className='p-2 max-w-md mx-auto'>
      <h1 className='my-7 text-sxl text-center font-semibold'>Signup</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' 
        className='border p-1  rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Email' 
        className='border p-1  rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' 
        className='border p-1  rounded-lg' id='password' onChange={handleChange}/>
        <button disabled ={loading} type='submit' 
          className='bg-slate-700 p-1 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Signup'}
        </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to = '/signin'>
            <span className=' text-blue-700'>signin</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup;
