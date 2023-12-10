
const mongoose = require('mongoose');

const connectDB = () => {
  const db = mongoose.connection;
  
  db.on('open', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with a non-zero status code
  });
  
  mongoose.connect(process.env.MONGODBURL);
};

module.exports = connectDB;