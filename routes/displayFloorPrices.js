const express = require('express');
const {displayFloorPrice} = require('../controllers/getController');
const router = express.Router();

router.get('/', displayFloorPrice)

module.exports = router;

