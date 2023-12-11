const express  = require('express');
const {updateuserinfo} = require('../controllers/user.controller');
const { verifytoken } = require('../utils/verifyUser');
const router =express.Router();

router.post('/update/:id',verifytoken, updateuserinfo);

module.exports = router;