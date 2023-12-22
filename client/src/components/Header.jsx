import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to access the location object

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL);
    }
  }, []);


  return (
    
    <header className='bg-slate-200 shadow-md p-3'>
        <div className='flex justify-between items-center max-w-6xl mx-auto py-1 px-3'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Mule</span>
                <span className='text-slate-700'>Estate</span>
            </h1>

            <form onSubmit={handleSubmit} className='bg-slate-100 p-1 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...'  onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent focus:outline-none w-24 sm:w-64 '  
                /> 
                <button ><FaSearch className='text-slate-600'/></button>
            </form>

            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>

                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>

                <Link to='/profile'>
                {currentuser ?
                (
                    <img src={currentuser.avatar} alt={currentuser.name} className='w-8 h-8 rounded-full  object-cover'/>
                )
                :
                <li className='sm:inline text-slate-700 hover:underline'>Sign in</li>
                }
                </Link>
            </ul>

        </div>

    </header>
  )
}

export default Header;
