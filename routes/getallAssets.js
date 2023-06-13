const { getAllAssets } = require('../controllers/getAllCollectionandAssets')
const express = require('express');

const router =  express.Router()


router.route('/')
.get(getAllAssets);



module.exports = router