const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./DB/DBConnection');
const userRouter = require('./routes/user.route');
const cookieparser = require('cookie-parser');
const ListingRoute = require('./routes/listingroute');
const path = require('path');
dotenv.config();
connectDB();
const app = express();
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/users', userRouter);
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/listings',ListingRoute);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message: message
    });
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



