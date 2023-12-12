const ListingModel = require('../Models/listing.model');


const createListing = async (req,res,next) =>{
    try{
        const listing = await ListingModel.create(req.body);
        return res.status(200).json(listing);
    }
    catch(err){
        next(err);
    }
}

module.exports = {createListing};