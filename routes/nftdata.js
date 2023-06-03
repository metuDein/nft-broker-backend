const express = require('express');
const {getNftData} = require('../controllers/getController');
const router = express.Router();

router.get('/', getNftData)

module.exports = router;

