const router = require('express').Router()
const { getAllmessages } = require('../controllers/frontendControllers');


router.get('/', getAllmessages);


module.exports = router;