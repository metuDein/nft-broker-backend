const express = require('express');
const { createAllAssets } = require('../controllers/assetsController ');
const router = express.Router()

router.post('/', createAllAssets)

module.exports = router;