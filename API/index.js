const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./DB/DBConnection');
connectDB();
const userRouter = require('./routes/user.route')
const UserModel = require('./Models/user.model');
const app = express();

app.use('/api/users',userRouter );


app.get('/',(req, res) => {
  res.json({message: 'API Working'});
})


app.listen(3000, () => {
  console.log('listening on port 3000');
});