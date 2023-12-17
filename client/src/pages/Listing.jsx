import React, { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
const Listing = () => {
  const {currentuser} =useSelector(state=>state.user)
    const params = useParams();
    const [listing, setListing] = useState();
    const [contact,setcontact] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
          try {
            const res = await fetch(`/api/listings/get/${params.Listing_ID}`);
            if (!res.ok) {
              throw new Error(`Failed to fetch listing: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            setListing(data);
          } catch (error) {
            console.error('Failed to fetch listing:', error);
          }
        }
        fetchListing();
      }, []);
  return (
    <main  className=''>
      {listing && 
        <div>
        <img
          src={`http://localhost:3000/images/` + listing.avatar }
          alt={listing.name}
          style ={{ backgroundSize: 'cover', width: '100%', height: '400px' }}
        />
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
            {listing.name} - ${' '}
            {listing.offer ?
              <span className='text-green-700'>{listing.discountedPrice}</span>
              :
              <span className='text-red-700'>{listing.regularPrice}</span>
            }
            {listing.type === 'rent' && '/month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-sm text-slate-600'>
            <FaMapMarkerAlt className='text-green-700'/>
            {listing.address}
            </p>
            <div className='flex gap-4'>
            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            {listing.offer &&(
              <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
              ${+listing.regularPrice - +listing.discountedPrice} off
            </p>
            )}
            </div>
            <p className='text-slate-800 '>
            <span className='font-semibold text-black'>Description: </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
            <li className='flex items-center gap-1 whitespace-nowrap '>
              <FaBed className='text-lg' />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap '>
              <FaBath className='text-lg' />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap '>
              <FaParking className='text-lg' />
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap '>
              <FaChair className='text-lg' />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>
          {currentuser && listing.userRef !== currentuser._id && !contact && (
            <button onClick={() => setcontact(true)} className='bg-slate-700 text-white rounded hover:opacity-95 p-3'>
              Contact The Owner
            </button>
          )}
          {contact && <Contact listing={listing} />}
          </div>
        </div>
      }
    </main>
  )
}

export default Listing;
