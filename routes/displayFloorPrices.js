const express = require('express');
const {getHomepageData} = require('../controllers/getController');
const router = express.Router();

router.get('/', getHomepageData)

module.exports = router;

