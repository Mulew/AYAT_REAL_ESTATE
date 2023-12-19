const ListingModel = require('../Models/listing.model');
const errorHandler = require('../utils/error');

const deleteListing =async(req,res,next) => {

    const listing = await ListingModel.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,"no listing found with this id"));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"you can only delete your own listings"));
    } 

    try{
        await ListingModel.findByIdAndDelete(req.params.id);
        res.status(200).json("listing deleted successfully!");
    }
    catch(e){
        next(e);
    }

}

const UpdateListing =async(req,res,next) => {
    const listing = await ListingModel.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404,"no listing found with this id"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"you can only update your own listings"));
    }

    try{
        const updateListing = await ListingModel.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json({"listing updated" : updateListing});
    }
    catch(e){
        next(e);
    }
}

const getlisting = async(req,res,next) => {
    try{
        const listing = await ListingModel.findById(req.params.id);
        if(!listing) return next(errorHandler(404,"no listing found with this id"));
        res.status(200).json(listing);
    }
    catch(e){
        next(e);
    }
}

const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
      if (offer === undefined || offer === false) {
        offer = { $in: [false, true] };
      }
      let furnished = req.query.furnished;
      if(furnished === undefined || furnished === false) {
        furnished = { $in: [false, true] };
      }
      let parking = req.query.parking;
      if(parking === undefined || parking === false) {
        parking = { $in: [false, true] };
      }
      let type = req.query.type;
      if(type === undefined || type === 'all') {
        type = { $in: ['sell', 'rent'] };
      }
      const searchTerm = req.query.searchTerm || ''
      const sort = req.query.sort ||  'createdAt';
      const order = req.query.order || 'desc';
      const listings = await ListingModel.find({
        name:{$regex: searchTerm, $options: 'i'},
        offer,
        furnished,
        parking,
        type
      }).sort({[sort]:order}).limit(limit).skip(startIndex);
      return res.status(200).json(listings);
    } catch (e) {
      next(e);
    }
  };

module.exports = {deleteListing,UpdateListing,getlisting,getListings};