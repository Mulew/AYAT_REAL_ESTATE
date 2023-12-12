const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    imageurl: {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);