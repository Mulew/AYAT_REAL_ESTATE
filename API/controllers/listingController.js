const path =require("path");
const multer = require("multer");
const ListingModel = require("../Models/listing.model");
const multer = require('multer');
const path = require('path');



const createListing = upload.single(avatar),async(req,res,next) => {
    try{
        const { originalname, filename } = req.file;
        const { description } = req.body;
        const imagePath=`images/${filename}`,
        const listing = await ListingModel.create(req.body);
        return res.status(201).json(listing);
    }
    catch(err){
        next(err);
    }
}

module.exports = createListing;