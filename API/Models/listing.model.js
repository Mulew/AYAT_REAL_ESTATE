const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    regularPrice:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        required:true,
    },
    bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    avatar:{//image url
        type:String,
        required:true,
    },
    userRef:{//which user created this listing
        type:String,
        required:true,
    }

    
},{timeseries:true});

module.exports = mongoose.model('Listing',ListingSchema);