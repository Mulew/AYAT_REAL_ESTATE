
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';

const Listing = () => {
    const params = useParams();
    useEffect(() => {
        const fetchListing = async () => {
          try {
            const res = await fetch(`/api/listings/get/${params.Listing_ID}`);
            if (!res.ok) {
              throw new Error(`Failed to fetch listing: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
          } catch (error) {
            console.error('Failed to fetch listing:', error);
          }
        }

        fetchListing();
      }, []);
  return (
    <div>
      <h1>Listing</h1>
    </div>
  )
}

export default Listing;
