const express = require('express');
const { getUserWallet } = require('../controllers/authController');
const router = express.Router()

router.post('/', getUserWallet);

module.exports = router;