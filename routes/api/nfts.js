const express = require('express');
const router = express.Router();
const {getNfts, createNewAsset} = require('../../controllers/nftController');

router.route('/')
.get(getNfts)
.post(createNewAsset)

module.exports = router;
