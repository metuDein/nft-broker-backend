const router = require('express').Router()
const { getAllcartitems } = require('../controllers/frontendControllers');


router.get('/', getAllcartitems);


module.exports = router;