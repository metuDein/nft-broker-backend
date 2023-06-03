const express = require('express');
const {displayNftData} = require('../controllers/getController');
const router = express.Router();

router.get('/', displayNftData)

module.exports = router;

