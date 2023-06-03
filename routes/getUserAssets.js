const express = require('express');
const { getUserAssets } = require('../controllers/assetsController ');
const router = express.Router();


router.post('/', getUserAssets);

module.exports = router;