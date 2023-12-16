const express = require('express');
const router = express.Router();
const multer = require('multer');
const ListingModel = require('../Models/listing.model');
const { verifytoken } = require('../utils/verifyUser');
const path = require('path');

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

module.exports = router;