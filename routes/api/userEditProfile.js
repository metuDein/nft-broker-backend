
const express = require('express')
const router = express.Router();
const  updateUser = require('../../controllers/UserEditProfile')


router.patch('/', updateUser);

module.exports = router;