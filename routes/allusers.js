const router = require('express').Router()
const { getAllusers } = require('../controllers/frontendControllers');


router.get('/', getAllusers);


module.exports = router;