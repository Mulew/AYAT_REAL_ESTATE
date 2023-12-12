const express = require('express');
const { createListing } = require('../controllers/listing.controller');
const { verifytoken } = require('../utils/verifyUser');

const router = express.Router();

router.post('/create',verifytoken,createListing);

module.exports = router;