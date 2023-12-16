const express  = require('express');
const {updateuserinfo,getuserlisting} = require('../controllers/user.controller');
const { verifytoken } = require('../utils/verifyUser');
const router =express.Router();

router.post('/update/:id',verifytoken, updateuserinfo);
router.get('/listings/:id',verifytoken, getuserlisting);
module.exports = router;