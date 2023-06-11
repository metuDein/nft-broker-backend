const { HandleLogOut } = require('../controllers/logOut');

const router = require('express').Router();


router.get('/', HandleLogOut);



module.exports = router;


