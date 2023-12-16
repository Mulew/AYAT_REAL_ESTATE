
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
const UpdateListing = () => {
  const { currentuser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [beds, setBeds] = useState('');
  const [bath, setBath] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
 const navigate = useNavigate();
 const params =useParams();
 const ListingID = params.ListingID;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('sell', sell);
      formData.append('rent', rent);
      formData.append('parking', parking);
      formData.append('furnished', furnished);
      formData.append('offer', offer);
      formData.append('bedrooms', beds);
      formData.append('bathrooms', bath);
      formData.append('regularPrice', price);
      formData.append('discountedPrice', discount);
      if (files.length > 0) {
        formData.append('avatar', files[0]);
      }
      formData.append('userRef', currentuser._id);
    try {
      const res = await fetch(`/api/listings/update/${ListingID}`, {
        method: 'PUT',
        body: formData,
      });
        if (!res.ok) {
          throw new Error(`Failed to fetch listing b/c: ${res.status} ${res.statusText}`);
        }
  
      navigate('/profile');
    } catch (error) {
      console.error('Failed to create listing:', error);
    }
  };
  useEffect(() => {
    const fetchListing = async () => {
      const ListingID = params.ListingID;
      try {
        const res = await fetch(`/api/listings/get/${ListingID}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch listing: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        setFiles(data.avatar);
        setName(data.name);
        setDescription(data.description);
        setAddress(data.address);
        setParking(data.parking);
        setFurnished(data.furnished);
        setOffer(data.offer);
        setBeds(data.bedrooms);
        setBath(data.bathrooms);
        setPrice(data.regularPrice);
        setDiscount(data.discountedPrice);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    }
    
    fetchListing();
  }, []);
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Update A listing</h1>
      <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleFormSubmit} encType='multipart/form-data'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-3 rounded-lg'
            maxLength='62'
            minLength='10'
            required
          />

          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border p-3 rounded-lg'
            required
          />

          <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border p-3 rounded-lg'
            maxLength='62'
           minLength='10'
            required
          />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sell'
                name='sell'
                className='w-5'
                checked={sell}
                onChange={(e) => setSell(e.target.checked)}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                name='rent'
                className='w-5'
                checked={rent}
                onChange={(e) => setRent(e.target.checked)}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                name='parking'
                className='w-5'
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                name='furnished'
                className='w-5'
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                name='offer'
                className='w-5'
                checked={offer}
                onChange={(e) => setOffer(e.target.checked)}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex  items-center gap-6 flex-wrap'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedroom'
                name='bedroom'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bath'
                name='bath'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                value={bath}
                onChange={(e) => setBath(e.target.value)}
              />
              <p>Bath</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularprice'
                name='regularprice'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p>Regular Price</p>
              <span>$ / month</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discount'
                name='discount'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <p>Discount Price</p>
              <span className='text-sm'>$ / month</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4 '>
          <p className='font-semibold'>Images: </p>
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover</span>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded-lg w-full'
              type='file'
              id='images'
              accept='image/*'
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
            {files && 
              <img
              src={`http://localhost:3000/images/` + files || files}
              alt={name}
              className='w-16 h-16  mx-auto object-contain rounded-lg cursor-pointer self-center mt-2'
            />
            }
            <button
              hidden
              className='p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80'
            >
              Upload
            </button>
          </div>
          <button
            type='submit'
            className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80'
          >
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;