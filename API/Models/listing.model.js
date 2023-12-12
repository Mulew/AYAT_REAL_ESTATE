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
    regularprice:{
        type:Number,
        required:true,
    },
    discountedprice:{
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
    type:{
        type:String,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageurl:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    }

    
},{timeseries:true});

module.exports = mongoose.model('Listing',ListingSchema);