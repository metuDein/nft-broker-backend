const express = require('express');
const { getCollectionAssets } = require('../controllers/frontendControllers');
const router = express.Router();

router.post('/', getCollectionAssets);


module.exports = router;