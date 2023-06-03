const express = require('express');
const router = express.Router();
const {getDatamoralis} = require('../controllers/getController')



router.get('/', getDatamoralis)

module.exports = router;