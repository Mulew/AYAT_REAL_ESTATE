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

module.exports = {deleteListing};