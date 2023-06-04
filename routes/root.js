const express = require('express');
const router = express.Router();
const  { join } = require('path')


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'index.html'));
})

module.exports = router;