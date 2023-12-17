const express  = require('express');
const {updateuserinfo,getuserlisting,getuser} = require('../controllers/user.controller');
const { verifytoken } = require('../utils/verifyUser');
const router =express.Router();

router.post('/update/:id',verifytoken, updateuserinfo);
router.get('/listings/:id',verifytoken, getuserlisting);
router.get('/:id',verifytoken, getuser);
module.exports = router;