const { errorHandler } = require("./error");
const jwt = require('jsonwebtoken');

 const verifytoken = (req,res,next) => {
    //we should get the token from the cookie so lets install the package cookie-parser
    //lets get the token inside the cookie stored by the name access_token
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"you are not authorized to access this page"))
    }
    //verify the token is valid or not
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(403,"forbiddden during verify token"))
        }
        //if there is no any error then send the user to the place where he wants via the data get from cookie all the user data
        //here the user represent the id that we placed at the cookie during authentication after the user is authenticated
        //so the value of user is _id
        req.user = user;//save the user to the request and go to the next section maybe to update or any other page
        next();
    })

}
 module.exports = {verifytoken};