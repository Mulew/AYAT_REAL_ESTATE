import React, { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';

const Listing = () => {
    const params = useParams();
    const [listing, setListing] = useState();
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
        style ={{ backgroundSize: 'cover', width: '100%', height: '480px' }}
      />
        </div>
      }
    </main>
  )
}

export default Listing;
