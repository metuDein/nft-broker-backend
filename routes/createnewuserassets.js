const express = require('express');
const { createAsset } = require('../controllers/nftController');
const router = express.Router();

router.post('/creatanasset', createAsset);


module.exports = router