const addTopurchases = require('../../controllers/puchaseController');

const router = require('express').Router()

router.post('/', addTopurchases);

module.exports = router;


