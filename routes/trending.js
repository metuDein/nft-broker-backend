const express = require('express');
const { getTrendingData } = require('../controllers/getController');
const router = express.Router();

router.get('/', getTrendingData);

module.exports = router;

