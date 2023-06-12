const { getallAssets } = require('../controllers/frontendControllers');


const router = require('express').Router()


router.get('/', getallAssets);



module.exports = router;