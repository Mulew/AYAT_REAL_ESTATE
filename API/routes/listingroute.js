const express = require('express');
const router = express.Router();
const multer = require('multer');
const ListingModel = require('../Models/listing.model');
const { verifytoken } = require('../utils/verifyUser');
const path = require('path');
const {deleteListing,UpdateListing,getlisting} = require('../controllers/listing.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname);
  },
});
  const upload = multer({
    storage: storage,
  });

  router.post('/create',verifytoken, upload.single('avatar'), async(req, res) => {
  try {
    const { name, description, address, regularPrice, discountedPrice, bathrooms, bedrooms, furnished, parking, type, offer, userRef } = req.body;
    const imagePath = req.file.filename; // Set the imagePath to the relative path of the uploaded file
    const Listing = new ListingModel({
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      avatar: imagePath,
      userRef,
    });

    // Save the Image document to the database
    await Listing.save();
    res.status(200).json({ message: 'Data uploaded successfully', Info: Listing });
  } catch (err) {
    next(err);
  }
});

// PUT route to update a listing
router.put('/update/:listingID', verifytoken, upload.single('avatar'), async (req, res) => {
  try {
    const { listingID } = req.params;
    const { name, description, address, regularPrice, discountedPrice, bathrooms, bedrooms, furnished, parking, type, offer, userRef } = req.body;
    const imagePath = req.file ? req.file.filename : null; // Check if a new avatar file was uploaded

    // Find the listing by ID
    const listing = await ListingModel.findById(listingID);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Update the listing fields with the new values
    listing.name = name;
    listing.description = description;
    listing.address = address;
    listing.regularPrice = regularPrice;
    listing.discountedPrice = discountedPrice;
    listing.bathrooms = bathrooms;
    listing.bedrooms = bedrooms;
    listing.furnished = furnished;
    listing.parking = parking;
    listing.type = type;
    listing.offer = offer;
    listing.userRef = userRef;

    // Update the avatar if a new one was uploaded
    if (imagePath) {
      listing.avatar = imagePath;
    }

    // Save the updated listing to the database
    const updatedListing = await listing.save();

    res.json(updatedListing);
  } catch (error) {
    console.error('Failed to update listing:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
});


router.delete('/delete/:id',verifytoken,deleteListing);
router.post('/updates/:id',verifytoken,UpdateListing);
router.get('/get/:id',getlisting)

module.exports = router;