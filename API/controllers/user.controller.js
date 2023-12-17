const userModel = require("../Models/user.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");
const ListingScema = require("../Models/listing.model");

const updateuserinfo = async(req,res,next)=>{
    //before makin the update make sure the person who tries to make update is authenticated or not
    //when we sign in the user we created the token inside the cookie and now we can use that token to verify the user
    const requestid = req.params.id;//the id of the person who tries to update the user information
    const tokenid = req.user.id; //the valid user _id found in token we accesed during verifying the token from cookie
    if(tokenid !== requestid) return next(errorHandler(401,"you can only update your own page"))
    //if the user is authenticated then we can update the user information
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updateuser = await userModel.findByIdAndUpdate(req.params.id,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        },{new:true});

        const {password:pass, ...info} = updateuser._doc;
        res.status(200).send(info);
    }
    catch(error){
        next(error)
    }
}

const getuserlisting =async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only see your own listings"))
    }
    try{
        const listings = await ListingScema.find({userRef:req.params.id})
        return res.status(201).json(listings);
    }
    catch(err){
        next(err);
    }
}

const getuser =async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.params.id );
        if (!user) return next(errorHandler(404, "User not found"));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
      } catch (err) {
        next(err);
      }
}

module.exports = {updateuserinfo,getuserlisting,getuser};