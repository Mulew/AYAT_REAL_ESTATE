const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./DB/DBConnection');
//const UserModel = require('./Models/user.model');
const app = express();
connectDB();



app.listen(3000, () => {
  console.log('listening on port 3000');
});