const { getAnAsset } = require('../controllers/frontendControllers');


const router = require('express').Router()


router.route('/:id') 
.get(getAnAsset);



module.exports = router;