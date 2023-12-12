const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./DB/DBConnection');
const userRouter = require('./routes/user.route');
const cookieparser = require('cookie-parser');
dotenv.config();
connectDB();
const app = express();
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/listings',require('./routes/listings.route'))

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'public/images/'); // Specify the directory to store the uploaded files
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
// //   }
// // });
// // const upload = multer({ storage: storage });
// // app.post('/api/upload', upload.single('myimage'), async (req, res) => {
// //   try {
// //     const { name, title, description } = req.body;
// //     const imagePath = path.join('/images', req.file.filename); // Set the imagePath to the relative path of the uploaded file

// //     // Create a new Image document
// //     const image = new imageSchema({
// //       name,
// //       title,
// //       description,
// //       image: imagePath,
// //     });

// //     // Save the Image document to the database
// //     await image.save();

// //     // Return a response to the client indicating the success of the upload
// //     res.status(200).json({ message: 'Image uploaded successfully' });
// //   } catch (error) {
// //     console.error('Error uploading image:', error);
// //     // Return an error response to the client
// //     res.status(500).json({ error: 'Failed to upload image' });
// //   }
// // });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/'); // Specify the directory to store the uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
//   }
// });
// const upload = multer({ storage: storage });
// app.post('/api/upload', upload.array('myimages'), async (req, res) => {
//   try {
//     const { name, title, description } = req.body;
//     const imagePaths = req.files.map((file) =>
//       path.join('/images', file.filename)
//     ); // Set the imagePaths to the relative paths of the uploaded files

//     const images = imagePaths.map((imagePath) => ({
//       name,
//       title,
//       description,
//       imageurl: imagePath,
//     }));

//     // Create new Image documents for each uploaded image
//     await imageSchema.insertMany(images);

//     // Return a response to the client indicating the success of the upload
//     res.status(200).json({ message: 'Images uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading images:', error);
//     // Return an error response to the client
//     res.status(500).json({ error: 'Failed to upload images' });
//   }
// });


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



