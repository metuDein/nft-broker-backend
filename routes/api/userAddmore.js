const express = require('express');
const router = express.Router()
const addMore = require('../../controllers/userAddmoreInfo');

router.patch('/', addMore);

module.exports = router;