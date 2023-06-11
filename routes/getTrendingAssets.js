const { getTrendingAssets } = require('../controllers/frontendControllers');

const router = require('express').Router();


router.get('/', getTrendingAssets);

module.exports = router;