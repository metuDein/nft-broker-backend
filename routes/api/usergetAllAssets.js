const { getAllAssets } = require('../../controllers/userAssetsController');

const router = require('express').Router();

router.post('/', getAllAssets);

module.exports =  router;