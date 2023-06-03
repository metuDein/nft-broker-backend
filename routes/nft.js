const express = require('express');
const { getNfts } = require('../controllers/nftController');
const router = express.Router();

router.get('/', getNfts);

module.exports = router;