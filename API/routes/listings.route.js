const express = require('express');
const ListingModel = require('../Models/listing.model');
const multer = require('multer');
const path = require('path');
const { verifytoken } = require('../utils/verifyUser');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/'); // Specify the directory to store the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
    }
  });
  const upload = multer({ storage: storage });

router.post('/create',verifytoken,upload.array('myimages'),async(req,res,next)=>{
    try {
        const { name, description,address,sell,rent,parking,furnished,offer,beds,bath,price,discount } = req.body;
        const imagePaths = req.files.map((file) =>
          path.join('/images', file.filename)
        ); // Set the imagePaths to the relative paths of the uploaded files
    
        const images = imagePaths.map((imagePath) => ({
          name:name,
          description:description,
          address:address,
          parking:parking,
          furnished:furnished,
          offer:offer,
          bedrooms:beds,
          bathrooms:bath,
          regularprice:price,
          discountedprice:discount,
          imageurl: imagePath,
          userRef: "mule"
        }));
    
        // Create new Listing documents for each uploaded image
        await ListingModel.insertMany(images);
    
        // Return a response to the client indicating the success of the upload
        res.status(200).json({ message: 'Images uploaded successfully' });
      } catch (error) {
        console.error('Error uploading images:', error);
        // Return an error response to the client
        res.status(500).json({ error: 'Failed to upload images' + error });
      }
});

module.exports = router;
