const UserModel = require('../Models/user.model');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpw = bcryptjs.hashSync(password, 12);
  const newUser = new UserModel({ username: username, email: email, password: hashedpw });
  try {
    await newUser.save();
    res.status(200).json("User registered successfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await UserModel.findOne({ email: email });
    if (!validuser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorHandler(401, 'Wrong credentials'));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const {password:pass,...rest} = validuser._doc;
    res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);
  } catch (err) {
    next(err);
  }
};

const google = async (req,res,next)=>{
  try{
    const user = await UserModel.findOne({email:req.body.email});
    if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const {password:pass,...rest} = user._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
    else{
      const generatepw = Math.random().toString(36).slice(-8);
      const hashedpw = bcryptjs.hashSync(generatepw, 12);
      const newuser = new UserModel({
        username:req.body.name.split(" ").join("").toLowerCase(),
        email:req.body.email, 
        password:hashedpw,
        avatar:req.body.photo
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
      const {password:pass,rest} = newuser._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .stattus(200)
      .json(rest);

    }
  }
  catch(error){
    next(error)
  }
}

module.exports = { signup, signin, google };