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
    .json({ rest });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };