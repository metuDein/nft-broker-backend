const express = require('express');
const { getCollection } = require('../controllers/frontendControllers');
const router = express.Router();

router.post('/', getCollection);


module.exports = router;