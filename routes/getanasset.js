
const express = require('express');
const { getAnAsset } = require('../controllers/AdminAssetsController');
const router =  express.Router()


router.route('/:id')
.get(getAnAsset);



module.exports = router