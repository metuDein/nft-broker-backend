const express = require('express');
const {getNftOther} = require('../controllers/getController');
const router = express.Router();

router.get('/', getNftOther)

module.exports = router;

