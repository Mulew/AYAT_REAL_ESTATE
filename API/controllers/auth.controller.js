const UserModel = require('../Models/user.model');
const bcryptjs = require('bcryptjs');
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedpw = bcryptjs.hashSync(password, 12);
  const newUser = new UserModel({ username, email, password:hashedpw }); // Pass an object with user properties
    try{
        await newUser.save();
        res.status(200).json("User registered successfully" );
    }
    catch(e){
        res.status(500).json( e.message );
    }
};

module.exports = { signup };